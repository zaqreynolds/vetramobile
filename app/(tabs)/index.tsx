import { View, Text } from "dripsy";
import { ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { User } from "../../database/models/User";
import { UserService } from "database/services/User";
import { useForm, Controller } from "react-hook-form";
import {
  userOnboardingSchema,
  UserOnboardingSchema,
} from "validation/userOnboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { theme } from "theme";
import { ThemedTextInput } from "components/ThemedTextInput";
import { ThemedDatePicker } from "components/ThemedDatePicker";
import { ThemedRadioGroup } from "components/ThemedRadioGroup";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { ThemedButton } from "components/ThemedButton";

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserOnboardingSchema>({
    resolver: zodResolver(userOnboardingSchema),
    defaultValues: {
      measurementPreference: "imperial",
      heightFeet: 5,
      heightInches: 6,
      height: 167,
      weight: 70,
      birthday: new Date(2000, 0, 1),
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const localUser = await UserService.list();
      console.log("localUser", localUser);
      setUser(localUser[0]);
      setLoading(false);
    };
    fetchUser();
  }, []);

  console.log("loading", loading);
  console.log("user", user);

  const measurementPreference = watch("measurementPreference");

  useEffect(() => {
    setValue("weight", measurementPreference === "imperial" ? 140 : 70);
  }, [measurementPreference]);

  // Add these arrays for picker options
  const feetOptions = Array.from({ length: 8 }, (_, i) => i + 1); // 1-8 feet
  const inchesOptions = Array.from({ length: 12 }, (_, i) => i); // 0-11 inches
  const cmOptions = Array.from({ length: 250 }, (_, i) => i + 1); // 1-250 cm
  const lbsOptions = Array.from({ length: 500 }, (_, i) => i + 1); // 1-500 lbs
  const kgOptions = Array.from({ length: 227 }, (_, i) => i + 1); // 1-227 kg

  const onSubmit = async (data: UserOnboardingSchema) => {
    console.log("Form submitted with data:", data);

    // Convert height if in imperial mode
    if (
      data.measurementPreference === "imperial" &&
      data.heightFeet &&
      data.heightInches
    ) {
      // Convert feet and inches to centimeters
      const totalInches = data.heightFeet * 12 + data.heightInches;
      data.height = Math.round(totalInches * 2.54);
    }

    try {
      const newUser = await UserService.create(data);
      console.log("User created:", newUser);
      setUser(newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  if (loading) {
    return (
      <View
        sx={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          bg: "background",
          px: "10",
        }}
      >
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        bg: "background",
      }}
    >
      <Text
        sx={{
          fontSize: 32,
          fontWeight: "bold",
          color: "text",
          my: 10,
          borderRadius: 1,
        }}
      >
        Welcome to Vetra
      </Text>
      {!user && (
        <ScrollView keyboardShouldPersistTaps="handled">
          <View
            sx={{
              paddingHorizontal: 10,
              paddingVertical: 2,
              flex: 1,
              justifyContent: "flex-start",
            }}
          >
            <Text sx={{ marginBottom: theme.space[1] }}>
              Before we get started, we just need to know a little about you. .
              .
            </Text>
            <Text sx={{ marginVertical: theme.space[1] }}>What's your...</Text>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <>
                  <Text>First Name</Text>
                  <ThemedTextInput
                    sx={{
                      marginVertical: theme.space[1],
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      borderRadius: 4,
                      padding: "3",
                    }}
                    autoComplete="given-name"
                    textContentType="givenName"
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <>
                  <Text>Last Name</Text>
                  <ThemedTextInput
                    sx={{
                      marginVertical: theme.space[1],
                      borderWidth: 1,
                      borderColor: theme.colors.border,
                      borderRadius: 4,
                      padding: "3",
                    }}
                    autoComplete="given-name"
                    textContentType="givenName"
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="birthday"
              render={({ field }) => (
                <ThemedDatePicker
                  label="Birthday"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Text sx={{ marginBottom: theme.space[1] }}>Gender</Text>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <ThemedRadioGroup
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                    { label: "Prefer not to say", value: "prefer_not_to_say" },
                  ]}
                />
              )}
            />
            <Text sx={{ marginBottom: theme.space[1] }}>Do you prefer:</Text>
            <Controller
              control={control}
              name="measurementPreference"
              render={({ field }) => (
                <SegmentedControl
                  values={["Imperial", "Metric"]}
                  selectedIndex={measurementPreference === "imperial" ? 0 : 1}
                  onChange={(event) => {
                    const index = event.nativeEvent.selectedSegmentIndex;
                    const value = index === 0 ? "imperial" : "metric";
                    field.onChange(value);
                  }}
                  tintColor={theme.colors.primary}
                />
              )}
            />
            <Text sx={{ marginVertical: theme.space[1] }}>Height</Text>
            {watch("measurementPreference") === "imperial" ? (
              <View
                sx={{
                  flexDirection: "row",
                  gap: 2,
                  marginTop: 2,
                  alignItems: "center",
                }}
              >
                <Controller
                  name="heightFeet"
                  control={control}
                  render={({ field }) => (
                    <View sx={{ flex: 1 }}>
                      <Picker
                        selectedValue={field.value}
                        onValueChange={field.onChange}
                        style={{
                          height: 210,
                          width: "100%",
                          color: theme.colors.text,
                        }}
                        itemStyle={{ fontSize: 18, height: 216 }}
                      >
                        {feetOptions.map((feet) => (
                          <Picker.Item
                            key={feet}
                            label={feet.toString()}
                            value={feet}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                />
                <Text>ft</Text>
                <Controller
                  name="heightInches"
                  control={control}
                  render={({ field }) => (
                    <View sx={{ flex: 1 }}>
                      <Picker
                        selectedValue={field.value}
                        onValueChange={field.onChange}
                        style={{
                          height: 210,
                          width: "100%",
                          color: theme.colors.text,
                        }}
                        itemStyle={{ fontSize: 18, height: 216 }}
                      >
                        {inchesOptions.map((inches) => (
                          <Picker.Item
                            key={inches}
                            label={inches.toString()}
                            value={inches}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                />
                <Text>in</Text>
              </View>
            ) : (
              <Controller
                name="height"
                control={control}
                render={({ field }) => (
                  <Picker
                    selectedValue={field.value}
                    onValueChange={field.onChange}
                    style={{
                      height: 210,
                      width: "100%",
                      color: theme.colors.text,
                    }}
                    itemStyle={{ fontSize: 18, height: 216 }}
                  >
                    {cmOptions.map((cm) => (
                      <Picker.Item
                        key={cm}
                        label={`${cm} cm`}
                        value={cm}
                        style={{ fontSize: 18, height: 216 }}
                      />
                    ))}
                  </Picker>
                )}
              />
            )}

            <Text sx={{ marginTop: theme.space[2] }}>Weight</Text>
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <Picker
                  selectedValue={field.value}
                  onValueChange={field.onChange}
                  style={{
                    height: 210,
                    width: "100%",
                    color: theme.colors.text,
                  }}
                  itemStyle={{ fontSize: 18, height: 216 }}
                >
                  {(measurementPreference === "imperial"
                    ? lbsOptions
                    : kgOptions
                  ).map((value) => (
                    <Picker.Item
                      key={value}
                      label={`${value} ${
                        measurementPreference === "imperial" ? "lbs" : "kg"
                      }`}
                      value={value}
                      style={{ fontSize: 18, height: 216 }}
                    />
                  ))}
                </Picker>
              )}
            />
            <ThemedButton onPress={handleSubmit(onSubmit, onError)}>
              Continue
            </ThemedButton>
          </View>
        </ScrollView>
      )}
      {user && (
        <View>
          <Text>User found</Text>
        </View>
      )}
    </View>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { Picker } from "@react-native-picker/picker";
import { ThemedButton } from "components/themed/ThemedButton";
import { ThemedTextInput } from "components/themed/ThemedTextInput";
import { Text, View } from "dripsy";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { ScrollView, TextInput as RNTextInput } from "react-native";
import { View as RNView } from "react-native";
import { userOnboardingSchema } from "validation/userOnboardingSchema";
import { theme } from "theme";
import { UserOnboardingSchema } from "validation/userOnboardingSchema";
import { useRef } from "react";
import { useEffect } from "react";
import { UserService } from "database/services/User";
import { useUserStore } from "store/useUserStore";
import { ThemedDatePicker } from "components/themed/ThemedDatePicker";
import { ThemedRadioGroup } from "components/themed/ThemedRadioGroup";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

export const UserOnboardingForm = () => {
  const defaultValues: UserOnboardingSchema = {
    measurementPreference: "imperial",
    heightFeet: 5,
    heightInches: 6,
    height: 167,
    weight: 70,
    birthday: new Date(2000, 0, 1),
    firstName: "",
    lastName: "",
    gender: "",
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserOnboardingSchema>({
    resolver: zodResolver(userOnboardingSchema),
    defaultValues,
  });

  const measurementPreference = watch("measurementPreference");

  useEffect(() => {
    setValue("weight", measurementPreference === "imperial" ? 140 : 70);
  }, [measurementPreference]);

  const scrollViewRef = useRef<ScrollView>(null);
  const firstNameRef = useRef<RNTextInput>(null);
  const lastNameRef = useRef<RNTextInput>(null);
  const genderRef = useRef<RNView>(null);

  // Add these arrays for picker options
  const feetOptions = Array.from({ length: 8 }, (_, i) => i + 1); // 1-8 feet
  const inchesOptions = Array.from({ length: 12 }, (_, i) => i); // 0-11 inches
  const cmOptions = Array.from({ length: 250 }, (_, i) => i + 1); // 1-250 cm
  const lbsOptions = Array.from({ length: 500 }, (_, i) => i + 1); // 1-500 lbs
  const kgOptions = Array.from({ length: 227 }, (_, i) => i + 1); // 1-227 kg

  const setUser = useUserStore((state) => state.setUser);

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
      const newUser = await UserService.create({
        ...data,
        gender: data.gender || "prefer_not_to_say", // Ensure gender has valid value
      });
      console.log("User created:", newUser);
      setUser(newUser);

      if (newUser) {
        reset(defaultValues);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const onError = (errors: FieldErrors<UserOnboardingSchema>) => {
    console.log("Form validation errors:", errors);

    if (errors.firstName && firstNameRef.current) {
      firstNameRef.current.focus?.();
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    } else if (errors.lastName && lastNameRef.current) {
      lastNameRef.current.focus?.();
      lastNameRef.current.measure((_x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: true });
      });
    } else if (errors.gender && genderRef.current) {
      genderRef.current.measure((_x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: true });
      });
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" ref={scrollViewRef}>
      <View
        sx={{
          paddingHorizontal: 10,
          paddingVertical: 2,
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <Text sx={{ marginBottom: theme.space[1] }}>
          Before we get started, we just need to know a little about you. . .
        </Text>
        <Text sx={{ marginVertical: theme.space[1] }}>What's your...</Text>
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <>
              <Text>First Name</Text>
              <ThemedTextInput
                ref={firstNameRef}
                sx={{
                  marginVertical: theme.space[1],
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  borderRadius: 4,
                  padding: "3",
                }}
                error={!!errors.firstName}
                autoComplete="given-name"
                textContentType="givenName"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
              />
              {errors.firstName && (
                <Text
                  sx={{
                    color: theme.colors.alert,
                    marginBottom: theme.space[1],
                  }}
                >
                  *{errors.firstName.message}
                </Text>
              )}
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
                ref={lastNameRef}
                sx={{
                  marginVertical: theme.space[1],
                  borderWidth: 1,
                  borderColor: theme.colors.border,
                  borderRadius: 4,
                  padding: "3",
                }}
                error={!!errors.lastName}
                autoComplete="given-name"
                textContentType="givenName"
                onChangeText={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
              />
              {errors.lastName && (
                <Text
                  sx={{
                    color: theme.colors.alert,
                    marginBottom: theme.space[1],
                  }}
                >
                  *{errors.lastName.message}
                </Text>
              )}
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
              ref={genderRef}
              value={field.value}
              onChange={field.onChange}
              error={!!errors.gender}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
                { label: "Prefer not to say", value: "prefer_not_to_say" },
              ]}
            />
          )}
        />
        {errors.gender && (
          <Text
            sx={{ color: theme.colors.alert, marginBottom: theme.space[1] }}
          >
            *{errors.gender.message}
          </Text>
        )}

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
              style={{ marginBottom: theme.space[2] }}
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
  );
};

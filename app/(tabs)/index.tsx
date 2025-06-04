import { View, Text } from "dripsy";
import { TextInput, ScrollView, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { User } from "../../database/models/User";
import { UserService } from "database/services/User";
import { useForm, Controller } from "react-hook-form";
import {
  userOnboardingSchema,
  UserOnboardingSchema,
} from "validation/userOnboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { darkTheme, theme } from "theme";
import { ThemedTextInput } from "components/ThemedTextInput";

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const { control, handleSubmit } = useForm<UserOnboardingSchema>({
    resolver: zodResolver(userOnboardingSchema),
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
        px: "10",
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
        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
        >
          <View sx={{ p: 2, flex: 1, justifyContent: "flex-start" }}>
            <Text sx={{ marginBottom: theme.space[2] }}>
              Before we get started, we just need to know a little about you. .
              .
            </Text>
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <>
                  <Text
                    sx={{ fontSize: 16, fontWeight: "bold", color: "text" }}
                  >
                    What's your first name?
                  </Text>
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

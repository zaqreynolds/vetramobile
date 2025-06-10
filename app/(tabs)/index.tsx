import { UserOnboardingForm } from "components/forms/UserOnboardingForm";
import { View, Text } from "dripsy";
import { useEffect } from "react";
import { useUserStore } from "store/useUserStore";

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, []);

  console.log("user", user);

  return (
    <View
      sx={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
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
        {user ? "Vetra" : "Welcome to Vetra"}
      </Text>
      {!user && <UserOnboardingForm />}
      {user && (
        <View>
          <Text>User found</Text>
        </View>
      )}
    </View>
  );
}

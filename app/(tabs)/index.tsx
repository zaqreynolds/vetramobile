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
      {!user && <UserOnboardingForm />}
      {user && (
        <View>
          <Text>User found</Text>
        </View>
      )}
    </View>
  );
}

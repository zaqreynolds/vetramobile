import { UserOnboardingForm } from "components/forms/UserOnboardingForm";
import { View, Text } from "dripsy";
import { useEffect } from "react";
import { useUserStore } from "store/useUserStore";
import { useDripsyTheme } from "dripsy";

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const { theme } = useDripsyTheme();

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
        <View sx={{ padding: theme.space[1] }}>
          <Text sx={{ fontSize: theme.fontSizes.lg, fontWeight: "bold" }}>
            Welcome back, {user.firstName}!
          </Text>
        </View>
      )}
    </View>
  );
}

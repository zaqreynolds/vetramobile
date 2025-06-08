import { User } from "database/models/User";
import { UserService } from "database/services/User";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
  clearUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const users = await UserService.list();
      set({ user: users[0] });
    } catch (error) {
      console.error(error);
    }
  },
  clearUser: async () => {
    try {
      const { user } = useUserStore.getState();
      if (!user) return;
      await UserService.delete(user.id);
      set({ user: null });
    } catch (error) {
      console.error(error);
    }
  },
}));

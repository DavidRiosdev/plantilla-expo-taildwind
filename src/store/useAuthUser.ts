import { create } from "zustand";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { User } from "@/types/User";

interface AuthState {
  isAuthenticated: boolean;
  isLoadingInitialData: boolean;
  userLogged: User | null;
  login: (email: string, password: string) => Promise<void>;
  getMe: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthUser = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoadingInitialData: false,
  userLogged: null,

  login: async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://7b9578ae2741.ngrok-free.app/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(data.access_token);
      await SecureStore.setItemAsync("token", data.access_token);

      set({
        userLogged: data.user,
        isAuthenticated: true,
      });

      await get().getMe();
    } catch (error: any) {
      set({ isAuthenticated: false });
      const message =
        error.response?.data?.message || "Error al iniciar sesión";
      throw new Error(message);
    }
  },

  getMe: async () => {
    set({ isLoadingInitialData: true });
    try {
      const token = await SecureStore.getItemAsync("token");
      if (!token) throw new Error("No hay token");

      const response = await axios.get(
        `https://7b9578ae2741.ngrok-free.app/api/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response);

      set({
        userLogged: response.data,
        isAuthenticated: true,
        isLoadingInitialData: false,
      });
    } catch {
      await get().logout();
      set({ isLoadingInitialData: false });
    }
  },

  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({
      isAuthenticated: false,
      userLogged: null,
    });
  },
}));

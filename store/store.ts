/* eslint-disable no-unused-vars */
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface StateType {
  role: number;
  token: string;
  userID: string;
  name: string;
  setRole: (role: number) => void;
  setToken: (token: string) => void;
  setUserID: (user_id: string) => void;
  setName: (name: string) => void;
}

const useStore = create<StateType>()(
  persist(
    (set, get) => ({
      role: 0 || get()?.role,
      setRole: (role: number) => set({ role }),
      userID: '' || get()?.userID,
      setUserID: (userID: string) => set({ userID }),
      token: '' || get()?.token,
      setToken: (token: string) => set({ token }),
      name: '' || get()?.name,
      setName: (name: string) => set({ name })
    }),
    {
      name: 'store'
    }
  )
);
export default useStore;

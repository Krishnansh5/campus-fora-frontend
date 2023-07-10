/* eslint-disable no-unused-vars */
import create from 'zustand';
import { persist } from 'zustand/middleware';

interface StateType {
  role: number;
  token: string;
  userID: string;
  name: string;
  notificationToken: string;
  receiveNotification: boolean;
  setRole: (role: number) => void;
  setToken: (token: string) => void;
  setUserID: (user_id: string) => void;
  setName: (name: string) => void;
  setNotificationToken: (notificationToken: string) => void;
  setReceiveNotification: (receiveNotification: boolean) => void;
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
      setName: (name: string) => set({ name }),
      notificationToken: '' || get()?.notificationToken,
      setNotificationToken: (notificationToken: string) =>
        set({ notificationToken }),
      receiveNotification: false || get()?.receiveNotification,
      setReceiveNotification: (receiveNotification: boolean) =>
        set({ receiveNotification })
    }),
    {
      name: 'store'
    }
  )
);
export default useStore;

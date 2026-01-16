import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const initialState = {
  userData: {
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickName: "",
    phoneNumber: "",
  },
  profileData: {
    image: "",
    tripTypes: [] as string[],
    serviceArea: [] as string[],
  },
  makerProfileData: {
    image: "",
    serviceTypes: [] as string[],
    serviceArea: [] as string[],
    gallery: "",
    description: "",
    detailDescription: "",
  },
};

const useSignUpStore = create(
  devtools(
    combine(initialState, (set) => ({
      setUserData: (userData: typeof initialState.userData) =>
        set({ userData }),
      setProfileData: (profileData: typeof initialState.profileData) =>
        set({ profileData }),
      setMakerProfileData: (
        makerProfileData: typeof initialState.makerProfileData
      ) => set({ makerProfileData }),
    })),
    {
      name: "sign-up",
    }
  )
);

export const useUserDataStore = () => {
  const userData = useSignUpStore((state) => state.userData);
  return userData;
};

export const useProfileDataStore = () => {
  const profileData = useSignUpStore((state) => state.profileData);
  return profileData;
};

export const useMakerProfileDataStore = () => {
  const makerProfileData = useSignUpStore((state) => state.makerProfileData);
  return makerProfileData;
};

export const useSignUpAllDataStore = () => {
  const store = useSignUpStore();
  return store;
};

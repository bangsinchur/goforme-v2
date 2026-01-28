import { getUserInfo, getUserProfile } from "@/api/profile";
import { QUERY_KEYS } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/store/session";

export const useInfoData = () => {
  const session = useSession();
  const userId = session?.user?.userId;

  return useQuery({
    queryKey: QUERY_KEYS.profile.userInfo(),
    queryFn: async () => {
      try {
        const profile = await getUserInfo();
        return profile;
      } catch (error: any) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!userId,
  });
};

export const useProfileData = (makerId?: string) => {
  const session = useSession();
  const userId = session?.user?.userId;

  return useQuery({
    queryKey: makerId
      ? QUERY_KEYS.profile.maker(makerId)
      : QUERY_KEYS.profile.myProfile(),
    queryFn: async () => {
      try {
        const profile = await getUserProfile(makerId);
        return profile;
      } catch (error: any) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!makerId || !!userId,
  });
};

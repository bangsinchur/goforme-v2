"use client";

import { useSessionActions } from "@/store/session";
import { useProfileData } from "@/hooks/queries/use-profile-data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { avatarImages } from "@/lib/utils";
import defaultAvatar from "@/assets/icon_default.svg";
import { PopoverClose } from "@radix-ui/react-popover";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function ProfileButton() {
  const { session, setSession } = useSessionActions();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: profileData } = useProfileData();

  const avatarImage = avatarImages.find(
    (image) => image.key === profileData?.image
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setSession(null);
    queryClient.clear();
    router.push("/login");
  };

  if (!session)
    return (
      <Link href="/login">
        <Button>로그인</Button>
      </Link>
    );

  return (
    <Popover>
      <PopoverTrigger>
        <Image
          className="rounded-full cursor-pointer object-cover"
          src={avatarImage?.src || defaultAvatar}
          alt="avatar"
          width={35}
          height={35}
        />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col items-center justify-center w-40">
        <PopoverClose asChild>
          <div
            onClick={handleLogout}
            className="hover:bg-muted cursor-pointer w-full text-center font-bold py-2 rounded"
          >
            로그아웃
          </div>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

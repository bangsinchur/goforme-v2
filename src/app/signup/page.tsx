"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/assets/icon_logo_img3.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signUpSchema, type SignUpFormData } from "@/lib/validate";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSignUpAllDataStore } from "@/store/sign-up";
import DreamerProfile from "@/components/profile/dreamer-profile";
import MakerProfile from "@/components/profile/maker-profile";
import { useImageSelectModal } from "@/store/image-select-modal";
import { useSetSelectedLocation } from "@/store/trip-plan-select";
import { useSignUp } from "@/hooks/mutations/use-sign-up";
import { toast } from "sonner";
import { useRouter } from "next/router";

export default function SignUpPage() {
  const {
    userData,
    profileData,
    makerProfileData,
    setUserData,
    setProfileData,
    setMakerProfileData,
  } = useSignUpAllDataStore();
  const { selectedImage } = useImageSelectModal();
  const { selectedLocation, selectedService } = useSetSelectedLocation();

  const { mutate: signUpMutation, isPending: isSignUpPending } = useSignUp();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  // const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    const userPayload = {
      role: data.role,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      nickName: data.nickName,
      phoneNumber: data.phoneNumber,
    };

    setUserData(userPayload);

    if (data.role === "DREAMER") {
      const profilePayload = {
        image: selectedImage ?? "",
        tripTypes: selectedLocation,
        serviceArea: selectedService,
      };

      setProfileData(profilePayload);
      const payload = { user: userPayload, profile: profilePayload };

      console.log("SignUp payload:", payload);

      // signUpMutation(
      //   { user: userPayload, profile: profilePayload },
      //   {
      //     onSuccess: () => {
      //       toast.success("회원가입이 완료되었습니다.", {
      //         position: "top-center",
      //       });
      //       router.push("/login");
      //     },
      //     onError: (error) => {
      //       toast.error(`${error.message}-회원가입에 실패했습니다.`, {
      //         position: "top-center",
      //       });
      //     },
      //   }
      // );
    } else if (data.role === "MAKER") {
      const makerPayload = {
        image: selectedImage ?? "",
        serviceTypes: selectedService,
        serviceArea: selectedLocation,
        gallery: "",
        description: "",
        detailDescription: "",
      };

      setMakerProfileData(makerPayload);
      signUpMutation(
        { user: userPayload, makerProfileData: makerPayload },
        {
          onSuccess: () => {
            toast.success("회원가입이 완료되었습니다.", {
              position: "top-center",
            });
            // router.push("/login");
          },
          onError: (error) => {
            toast.error(`${error.message}-회원가입에 실패했습니다.`, {
              position: "top-center",
            });
          },
        }
      );
    }
  };
  const roleSelected = watch("role");

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center h-screen gap-10"
      >
        <Link
          className="flex items-center gap-2  rounded-2xl pl-1 pr-3 py-1"
          href="/"
        >
          <Image
            width={80}
            height={80}
            src={logo}
            alt="logo"
            className="rounded-2xl"
          />
          <div className="flex flex-col gap-2 text-4xl font-bold ">
            <p>GoForMe</p>
            <p className="text-base text-muted-foreground">여행 중개 플랫폼</p>
          </div>
        </Link>

        <div className="text-2xl font-bold">회원가입</div>
        <div className="flex flex-col w-full max-w-160 gap-3">
          <div className="flex items-center gap-2">
            <Input
              className="py-5"
              type="email"
              placeholder="이메일(abc@example.com)"
              {...register("email")}
            />
            <Button>이메일 확인</Button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              className="py-5"
              placeholder="닉네임"
              {...register("nickName")}
            />
            <Button>닉네임 확인</Button>
          </div>
          <Input
            className="py-5"
            placeholder="비밀번호"
            type="password"
            {...register("password")}
          />
          <Input
            className="py-5"
            placeholder="비밀번호 확인"
            type="password"
            {...register("confirmPassword")}
          />
          <div className="flex items-center gap-2">
            <Input
              className="py-5"
              placeholder="전화번호"
              {...register("phoneNumber")}
            />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="py-5">
                    <SelectValue placeholder="여행자 선택(필수)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DREAMER">DREMER(여행요청)</SelectItem>
                    <SelectItem value="MAKER">MAKER(여행실행)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {roleSelected === "DREAMER" && <DreamerProfile />}
          {roleSelected === "MAKER" && <MakerProfile />}
          <Button className="py-5" type="submit">
            회원가입
          </Button>
          <div className="text-sm">
            이미 가입하셨나요?{" "}
            <Link href="/login" className="text-blue-500 underline">
              로그인하기
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

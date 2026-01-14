"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/assets/logo_img2.png";
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
import { useSignUp } from "@/store/sign-up";

export default function SignUpPage() {
  const { setUserData } = useSignUp();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("데이터:", data);
    setUserData({
      role: data.role,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      nickName: data.nickName,
      phoneNumber: data.phoneNumber,
    });
  };

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
          <Image src={logo} alt="logo" className="h-20 w-30 rounded-2xl" />
          <div className="flex flex-col gap-2 text-4xl font-bold ">
            <p>GoForMe</p>
            <p className="text-base text-muted-foreground">여행 중개 플랫폼</p>
          </div>
        </Link>

        <div className="text-2xl font-bold">회원가입</div>
        <div className="flex flex-col w-full max-w-160 gap-3">
          <Input
            className="py-5"
            type="email"
            placeholder="이메일(abc@example.com)"
            {...register("email")}
          />
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
                <Select {...field}>
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

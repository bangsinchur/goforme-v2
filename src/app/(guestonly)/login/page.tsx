'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/icon_logo_img3.jpg";
import { useLogin } from "@/hooks/mutations/use-login";
import { toast } from "sonner";
import { LoginFormData, loginSchema } from "@/lib/validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const { mutate: loginMutation, isPending: isLoginPending } = useLogin();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter()
  const onSubmit = (data: LoginFormData) => {
    loginMutation(data, {
      onSuccess: () => {
        toast.success("로그인 성공", {
          position: "top-center",
        });

        router.replace("/")
      },
      onError: (error) => {
        toast.error(error.message, {
          position: "top-center",
        });
      },
    });
  };

  return (
    <>
      <form className="flex flex-col justify-center items-center max-w-160 mx-auto h-screen gap-3">
        <Link className="flex items-center gap-2  rounded-2xl pl-1 pr-3 py-1" href="/">
          <Image width={80} height={80} src={logo} alt="logo" className="rounded-2xl" />
          <div className="flex flex-col gap-2 text-4xl font-bold ">
            <p>GoForMe</p>
            <p className="text-base text-muted-foreground">여행 중개 플랫폼</p>
          </div>
        </Link>
        <div className="text-2xl font-bold">로그인</div>
        <Input className="py-5" type="email" placeholder="이메일" {...register("email")} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <Input className="py-5" type="password" placeholder="비밀번호" {...register("password")} />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <Button onClick={handleSubmit(onSubmit)} className="py-5 w-full" type="submit">로그인</Button>
        <div className="text-sm text-center flex gap-2">
          계정이 없으시다면?
          <Link href="/signup" className="text-blue-500 underline">회원가입</Link>
        </div>
      </form>
    </>

  );
}

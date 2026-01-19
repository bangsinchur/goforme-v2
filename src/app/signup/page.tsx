'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import logo from '@/assets/icon_logo_img3.jpg'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { signUpSchema, type SignUpFormData } from '@/lib/validate'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DreamerProfile from '@/components/profile/dreamer-profile'
import MakerProfile from '@/components/profile/maker-profile'
import { useImageSelectModal } from '@/store/image-select-modal'
import { useSetSelectedLocation } from '@/store/trip-plan-select'
import { useCheckEmail, useCheckNickName, useSignUp } from '@/hooks/mutations/use-sign-up'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import RoleSelector from '@/components/ui/role-selector'

export default function SignUpPage() {
  const { selectedImage } = useImageSelectModal()
  const { selectedLocation, selectedService } = useSetSelectedLocation()

  const { mutate: signUpMutation, isPending: isSignUpPending } = useSignUp()
  const { mutate: checkNickNameMutation, isPending: isCheckNickNamePending } = useCheckNickName()
  const { mutate: checkEmailMutation, isPending: isCheckEmailPending } = useCheckEmail()

  const {
    register,
    trigger,
    handleSubmit,
    control,
    watch,
    setFocus,
    formState: { errors, isValid },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
  })

  const router = useRouter()
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isNickNameValid, setIsNickNameValid] = useState(false)
  const emailValue = watch('email')
  const nickNameValue = watch('nickName')

  useEffect(() => {
    setIsEmailValid(false)
  }, [emailValue])

  useEffect(() => {
    setIsNickNameValid(false)
  }, [nickNameValue])

  const isSubmitDisabled = !isValid || !isEmailValid || !isNickNameValid || isSignUpPending

  const onSubmit = async (data: SignUpFormData) => {
    const userPayload = {
      role: data.role,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      nickName: data.nickName,
      phoneNumber: data.phoneNumber,
    }

    if (data.role === 'DREAMER') {
      const profilePayload = {
        image: selectedImage ?? '',
        tripTypes: selectedLocation,
        serviceArea: selectedService,
      }

      signUpMutation(
        { user: userPayload, profile: profilePayload },
        {
          onSuccess: () => {
            toast.success('회원가입이 완료되었습니다.', {
              position: 'top-center',
            })
            router.push('/login')
          },
          onError: (error) => {
            toast.error(`${error.message}-회원가입에 실패했습니다.`, {
              position: 'top-center',
            })
          },
        },
      )
    } else if (data.role === 'MAKER') {
      const makerPayload = {
        image: selectedImage ?? '',
        serviceTypes: selectedService,
        serviceArea: selectedLocation,
        gallery: '',
        description: '',
        detailDescription: '',
      }

      signUpMutation(
        { user: userPayload, makerProfileData: makerPayload },
        {
          onSuccess: () => {
            toast.success('회원가입이 완료되었습니다.', {
              position: 'top-center',
            })
            router.push('/login')
          },
          onError: (error) => {
            toast.error(`${error.message}-회원가입에 실패했습니다.`, {
              position: 'top-center',
            })
          },
        },
      )
    }
  }
  const roleSelected = watch('role')

  const handleCheckEmail = async () => {
    checkEmailMutation(
      {
        email: watch('email'),
      },
      {
        onSuccess: (data) => {
          if (!data) {
            toast.error('이메일 중복, 다른 이메일을 입력해주세요.', {
              style: {
                backgroundColor: 'var(--chart-4)',
              },
              position: 'top-center',
            })
            setFocus('email')
            return
          }
          setIsEmailValid(true)
          toast.success('이메일 확인 완료', {
            position: 'top-center',
          })
        },
        onError: (error) => {
          toast.error(`${error.message}-이메일 확인에 실패했습니다.`, {
            style: {
              backgroundColor: 'var(--chart-1)',
            },
            position: 'top-center',
          })
        },
      },
    )
  }
  const handleCheckNickName = async () => {
    checkNickNameMutation(
      { nickName: watch('nickName') },
      {
        onSuccess: (data) => {
          if (!data) {
            toast.error('닉네임 중복, 다른 닉네임을 입력해주세요.', {
              style: {
                backgroundColor: 'var(--chart-4)',
              },
              position: 'top-center',
            })
            setFocus('nickName')
            return
          }
          setIsNickNameValid(true)
          toast.success('닉네임 확인 완료', {
            position: 'top-center',
          })
        },
        onError: (error) => {
          toast.error(`${error.message}-닉네임 확인에 실패했습니다.`, {
            style: {
              backgroundColor: 'var(--chart-1)',
            },
            position: 'top-center',
          })
        },
      },
    )
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center h-screen gap-10"
      >
        <Link className="flex items-center gap-2  rounded-2xl pl-1 pr-3 py-1" href="/">
          <Image width={80} height={80} src={logo} alt="logo" className="rounded-2xl" />
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
              {...register('email')}
            />
            <Button type="button" disabled={isCheckEmailPending} onClick={handleCheckEmail}>
              이메일 확인
            </Button>
          </div>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <div className="flex items-center gap-2">
            <Input className="py-5" placeholder="닉네임" {...register('nickName')} />
            <Button type="button" disabled={isCheckNickNamePending} onClick={handleCheckNickName}>
              닉네임 확인
            </Button>
          </div>
          {errors.nickName && <p className="text-red-500">{errors.nickName.message}</p>}
          <Input
            className="py-5"
            placeholder="비밀번호"
            type="password"
            {...register('password')}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          <Input
            className="py-5"
            placeholder="비밀번호 확인"
            type="password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
          <div className="flex items-center gap-2">
            <Input className="py-5" placeholder="전화번호" {...register('phoneNumber')} />
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <RoleSelector
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                />
              )}
            />
          </div>
          {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
          {roleSelected === 'DREAMER' && <DreamerProfile />}
          {roleSelected === 'MAKER' && <MakerProfile />}
          <Button className="py-5" type="submit" disabled={isSubmitDisabled}>
            회원가입
          </Button>
          <div className="text-sm">
            이미 가입하셨나요?{' '}
            <Link href="/login" className="text-blue-500 underline">
              로그인하기
            </Link>
          </div>
        </div>
      </form>
    </>
  )
}

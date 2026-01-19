'use client'

import { startTransition, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function SignUpError({ error, reset }: { error: Error; reset: () => void }) {
    const router = useRouter()

    useEffect(() => {
        console.error(error.message)
    }, [error])

    return (
        <div>
            <div>회원가입 페이지에서 오류가 발생했습니다.</div>
            <h1>{error.message}</h1>
            <Button
                variant="outline"
                onClick={() => {
                    startTransition(() => {
                        router.refresh()
                        reset()
                    })
                }}
            >
                다시 시도
            </Button>
        </div>
    )
}

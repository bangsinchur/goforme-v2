import Image from "next/image";
import loading from '@/assets/icon_loading.png'

export default function GlobalLoader() {
    return <div className='bg-muted h-screen w-screen flex flex-col items-center justify-center '>
        <div className="flex items-center mb-15 animate-bounce">
            <Image src={loading} alt="loading" width={100} height={100} />
            <div className="text-2xl font-bold">GoForMe</div>
        </div>
    </div>
}
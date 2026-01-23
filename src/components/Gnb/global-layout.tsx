import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/icon_logo_img3.jpg";
import { SunIcon } from "lucide-react";
import defaultAvatar from "@/assets/icon_default.svg";

export default function GlobalNavbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-15 bg-background border-b fixed top-0 left-0 w-full shadow z-50">
        <div className="flex justify-between h-full w-full px-10">
          <Link href="/" className="flex items-center gap-2">
            <Image width={40} height={40} className="rounded-lg " src={logo} alt="Logo" />
            <div className="font-bold text-2xl">GoForMe</div>
          </Link>

          <div className="flex items-center gap-5">
            <div className="hover:bg-muted cursor-pointer rounded-full p-2">
              <SunIcon />
            </div>
            <Image width={24} height={24} src={defaultAvatar} alt="Default Avatar" />
          </div>
        </div>
      </header>
      <main className="flex-1 m-auto max-w-225 border-x mt-10 w-full px-4 py-6">{children}</main>
      <footer className="border-t py-5 text-muted-foreground text-center">
        @Developer B.GEN
      </footer>
    </div>
  );
}

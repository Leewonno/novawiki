'use client';

import { Button } from "@/components";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/shadcn/input-group";
import Link from "next/link";
import { SearchIcon } from 'lucide-react';
import { useUserStore } from "@/store/useUserStore";
import { logout } from "@/app/actions/auth";

export function Header() {
  const { isAuthenticated, isLoading, clearUser } = useUserStore();
  const handleLogout = async () => {
    await logout();
    clearUser();
  };
  return (
    <header className="flex justify-center border-b-1">
      <div className="flex justify-between w-full lg:w-[1200px] h-[60px]">
        <div className="flex items-center">
          <div className="font-extrabold text-2xl tracking-tighter">
            <Link href="/">
              NOVAWIKI
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="flex gap-2">
            {isLoading ? (
              <div className="w-20 h-9 bg-gray-200 animate-pulse rounded" />
            ) : isAuthenticated ? (
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleLogout()}
                >
                  로그아웃
                </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button className="cursor-pointer">로그인</Button>
                </Link>
                <Link href="/signup">
                  <Button className="cursor-pointer">회원가입</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

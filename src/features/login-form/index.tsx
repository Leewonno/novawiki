"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/app/actions/auth";
import { Button } from "@/components";
import { Field, FieldGroup } from "@/components/ui/shadcn/field";
import { Input } from "@/components/ui/shadcn/input";
import { simpleMessageToast } from "@/lib/utils/common";
import { useUserStore } from "@/store/useUserStore";

export function LoginForm() {
  const router = useRouter();
  const { setUser } = useUserStore();

  // 아이디
  const [userid, setUserid] = useState<string>("");
  // 비밀번호
  const [password, setPassword] = useState<string>("");

  // 아이디
  const handleUseridChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserid(value);
  };

  // 비밀번호
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleAction = async (formData: FormData) => {
    const result = await login(formData);
    if (result.error) {
      simpleMessageToast("로그인 오류", result.error);
      return;
    }
    if (result.success && result.id) {
      setUser({ id: result.id });
      router.push("/");
    }
  };

  return (
    <form action={handleAction} className="w-80">
      <FieldGroup>
        <Field>
          <Input
            id="input-field-userid"
            type="text"
            name="userid"
            value={userid}
            onChange={handleUseridChange}
            placeholder="아이디"
          />
        </Field>
        <Field>
          <Input
            id="input-field-password"
            type="password"
            name="password"
            placeholder="비밀번호"
            value={password}
            onChange={handlePasswordChange}
          />
        </Field>

        <Button type="submit" className="w-full cursor-pointer mt-2!">
          로그인
        </Button>
        <div className="text-center mt-3">
          <Link
            href="/signup"
            className="text-sm text-muted-foreground underline"
          >
            회원가입
          </Link>
        </div>
      </FieldGroup>
    </form>
  );
}

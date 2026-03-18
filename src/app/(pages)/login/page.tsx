import { LoginForm } from "@/features";

export default function Login() {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-xl tracking-tight mb-6!">
        <span>로그인</span>
      </div>
      <LoginForm />
    </div>
  );
}

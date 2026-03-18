import { SignUpForm } from "@/features";

export default function SignUp() {
  return (
    <div className="flex flex-col items-center">
      <div className="font-bold text-xl tracking-tight mb-6!">
        <span>회원가입</span>
      </div>
      <SignUpForm />
    </div>
  );
}

import { login } from "@/app/(server)/actions/auth";

export default function Login() {
  return (
    <form action={login}>
      <input name="userid" type="text" placeholder="아이디" />
      <input name="password" type="password" placeholder="비밀번호" />
      <button type="submit">로그인</button>
    </form>
  )
}

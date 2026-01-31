import { login } from "@/app/(server)/actions/auth";

export default function Login() {
  return (
    <form action={login}>
      <input name="userid" type="text" />
      <input name="password" type="password" />
      <button type="submit">로그인</button>
    </form>
  )
}

import { signUp } from "@/app/(server)/actions/auth";

export default function SignUp() {
  return (
    <form action={signUp}>
      <input name="userid" type="text" />
      <input name="password" type="password" />
      <input name="nick" type="nick" />
      <button type="submit">회원가입</button>
    </form>
  )
}

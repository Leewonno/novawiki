import { signUp } from "@/app/(server)/actions/auth";

export default function SignUp() {
  return (
    <form action={signUp}>
      <input name="userid" type="text" placeholder="아이디" />
      <input name="password" type="password" placeholder="비밀번호" />
      <input type="password" placeholder="비밀번호 확인" />
      <input name="nick" type="nick" placeholder="닉네임" />
      <button type="submit">회원가입</button>
    </form>
  )
}

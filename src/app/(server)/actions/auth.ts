'use server'

import { Api } from "@/shared"
import { redirect } from "next/navigation"

/** 로그인 */
export async function login(formData: FormData) {
    const { data } = await Api.auth.login(
        formData.get('userid') as string,
        formData.get('password') as string,
    )
    if (data && data.session) {
        redirect('/')
    }
}

/** 회원가입 */
export async function signUp(formData: FormData) {
    const res = await Api.auth.signUp(
        formData.get('userid') as string,
        formData.get('password') as string,
        formData.get('nick') as string,
    )
    if (res && res.data) {
        redirect('/')
    }
}

/** 로그아웃 */
export async function logout() {
    await Api.auth.logout();
    redirect('/login');
}
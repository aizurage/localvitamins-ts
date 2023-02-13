import { Center, Group, Input, Button, Space } from '@mantine/core'
import { supabase } from './supabaseClient'
import { useState } from 'react'
import { At } from 'tabler-icons-react'
import { useForm } from '@mantine/form'

export default function EmailResetPassword(){
    const [submitted, setSubmitted] = useState(false)
    const form = useForm({
        initialValues: {
            email: '',
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'メールアドレスが正しくありません'),
        },
    })

    const submit = async (values) => {
        try {
            const { error:sendingEmailError } = await supabase.auth.api.resetPasswordForEmail(values.email, {
                // 送信メールに埋め込まれるリンクのリダイレクト先のURL
                // reset-passwordへ遷移する
                redirectTo: 'https://localvitamins-ts.vercel.app/resetpassword',
            })
            if (sendingEmailError) throw sendingEmailError
        } catch (error) {
            console.log("Sending email for reset password failed")
            console.log(error.message)
            alert("メール送信に失敗しました。運営チーム（eiwachiku.c@gmail.com）にお問い合わせください。")
        }
    }

    return(
        <Center>
            <form onSubmit={form.onSubmit(submit)}>
                <h1>パスワードの再設定</h1>
                <p>アカウントに登録したメールアドレスを入力してください。</p>
                <Input
                    required
                    label="メールアドレス"
                    placeholder="your@email.com"
                    icon={<At />}
                    margin="center"
                    {...form.getInputProps('email')}
                />
                <Space h="xl" />
                <Group position="center" mt="md">
                    <Button
                        color='green'
                        type="submit"
                        onClick={() => {setSubmitted(true)}}
                    >
                        提出する
                    </Button>
                </Group>
                {!submitted ? "" :
                    <div>
                        <h2 className='email_resetpw'>注意！</h2>
                        <p>入力したメールアドレスの、メールボックスを確認してください。<br /> もしメールが来ていない場合は、 次の項目を確認してみてください。</p>
                        <ul>
                            <li>登録したメールアドレスとは異なるメールアドレスを入力していないか。</li>
                            <li>スペルミスをしていないか。</li>
                        </ul>
                    </div>
                }
            </form>
        </Center>
    )
}
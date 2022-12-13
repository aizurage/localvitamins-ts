import { Center, Group, PasswordInput, Button } from '@mantine/core';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';

export default function ResetPassword(){
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            password: '',
            confirmed_password: '',
        },

        validate: {
            confirmed_password: (value, values) => 
                value === values.password ? null : "パスワード本体　と　確認用のパスワードが違います。",
        },
    });

    const submit = async (values) => {
        try {
            const { error:PasswordResetError } = await supabase.auth.update({ password: values.password });
            if (PasswordResetError) throw PasswordResetError;
            navigate("/");
        } catch (error) {
            console.log("Sending new password failed");
            console.log(error.message);
            alert("パスワード再設定に失敗しました。運営チームにお問い合わせください。")
        }
    }

    return(
        <Center>
            <form onSubmit={form.onSubmit(submit)}>
                <h1>パスワードの再設定</h1>
                <p>アカウントに登録したメールアドレスを入力してください。</p>
                <PasswordInput label="パスワード" {...form.getInputProps('password')} />
                <PasswordInput 
                    label="パスワード（確認用）" 
                    description="確認のため、パスワードをもう一度入力してください。" 
                    {...form.getInputProps('conformed_password')}
                />
                <Group position="center" mt="md">
                    <Button
                        color='green'
                        type="submit"
                    >
                        提出する
                    </Button>
                </Group>
            </form>
        </Center>
    );
}
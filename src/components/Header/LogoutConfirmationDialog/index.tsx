import { Dialog, Button } from "@mantine/core";
import { FC } from "react";
import { logout } from "../controller/logout";
import styles from "./index.module.css"

interface Props {
    open: boolean
    setOpen: (arg: boolean) => void
}

export const LogoutConfirmationDialog: FC<Props> = ({open, setOpen}) => {
    const handleLogout = async () => {
        await logout()
            .catch(() => {
                alert(
                    "ログアウトに失敗しました。もう一度お試しいただき、それでも失敗する場合は、お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。"
                );
            })
    }

    return(
        <Dialog
            opened={open}
            onClose={() => {
                setOpen(false)
            }}
        >
            <p>ログアウトします。よろしいですか？</p>
            <div className={styles.dialog}>
                <Button
                    className={styles.yesButton}
                    onClick={() => {
                        handleLogout();
                        setOpen(false);
                    }}
                >
                    はい
                </Button>
                <Button
                    className={styles.noButton}
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    いいえ
                </Button>
            </div>
        </Dialog>
    )
}
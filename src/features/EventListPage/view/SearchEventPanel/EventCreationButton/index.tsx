import { Popover, Button } from "@mantine/core";
import { FC, useState } from "react";
import { supabase } from "../../../../../supabaseClient";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css"

export const EventCreationButton: FC = () => {
    const [popoverOpened, setPopoverOpened] = useState(false)
    const navigate = useNavigate()
    
    return(
        <Popover
            opened={popoverOpened}
            onClose={() => setPopoverOpened(false)}
            target={
              <Button
                className={styles.makeEvent}
                onClick={() => {supabase.auth.user() === null ? setPopoverOpened(true) : navigate('/eventmaker')}}
              >
                お手伝い作成
              </Button>
            }
            width={400}
            position="bottom"
            withArrow
          >
            アカウントを登録し、ログインすることで、あなた自身で「お手伝い」を作ることが出来ます。
            お手伝い作成、募集を行いたい場合は、ログイン、または新規登録をお願いします。
          </Popover>
    )
}
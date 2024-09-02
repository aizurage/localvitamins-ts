import { useState } from "react";
import {
  Burger,
  Button,
  Dialog,
  Divider,
  Drawer,
  Group,
  Text,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import Contact from "../../Contact/view";
import { supabase } from "../../../../supabaseClient";

import "./index.css";

export function Header() {
  const [dialogopen, setDialogopen] = useState(false);

  const navigate = useNavigate();

  const log_out = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      navigate("/");
      if (error) throw error;
    } catch (error) {
      console.log("Log out failed");
      console.log(error.message);
      alert(
        "ログアウトに失敗しました。もう一度お試しいただき、それでも失敗する場合は、お手伝い一覧画面のメニュー内にある、お問い合わせフォームにてご連絡ください。"
      );
    }
  };

  const [opened, setOpened] = useState(false);

  return (
    <>
      <header>
        <Burger
          opened={opened}
          onClick={() => {
            setOpened((o) => !o);
          }}
          size="xl"
          className="burger"
        />
        <Text className="title">Local Vitamins</Text>
        <div className="header_right">
          {supabase.auth.user() === null ? (
            <Button
              className="dialog_login"
              onClick={() => {
                navigate("/login");
              }}
            >
              ログイン
            </Button>
          ) : (
            <Button
              className="dialog_logout"
              onClick={() => {
                setDialogopen(true);
              }}
            >
              ログアウト
            </Button>
          )}
          <Button
            className="register"
            color="dark"
            variant="outline"
            onClick={() => {
              navigate("/serviceTerms_agree");
            }}
          >
            新規登録
          </Button>
        </div>
        <Dialog
          opened={dialogopen}
          onClose={() => {
            setDialogopen(false);
          }}
          position={{ top: "10%", left: "80%" }}
        >
          <p>ログアウトします。よろしいですか？</p>
          <Group>
            {
              <>
                <Button
                  color="red"
                  onClick={() => {
                    log_out();
                    setDialogopen(false);
                  }}
                >
                  {" "}
                  はい{" "}
                </Button>
                <Button
                  color="blue"
                  onClick={() => {
                    setDialogopen(false);
                  }}
                >
                  {" "}
                  いいえ{" "}
                </Button>
              </>
            }
          </Group>
        </Dialog>
      </header>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
      >
        {
          <>
            <h1>メニュー</h1>
            <Button
              className="back2home"
              component={Link}
              to={"/"}
              onClick={() => setOpened(false)}
            >
              ホームへ戻る
            </Button>
            <nav>
              <ul>
                <li
                  onClick={() => {
                    navigate("/serviceTerms", false);
                  }}
                >
                  利用規約(個人情報の取り扱いについて)
                </li>
                {/* <li onClick={() => { setDialogopen(true) }}>ログアウト</li> */}
              </ul>
            </nav>
            <Divider my="sm" />
            <Contact />
          </>
        }
      </Drawer>
    </>
  );
}

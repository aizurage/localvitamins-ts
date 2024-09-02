import { Button, Group, Modal, Textarea, TextInput } from "@mantine/core"
import { At } from "tabler-icons-react"

export const EventApplicationModal = () => {
    return(
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
        >
            <form onSubmit={join_event_form.onSubmit(join_event)}>
            <h3>{event.eventTitle}</h3>
            <p>以下の情報を主催者に送信して、参加申請をします。</p>
            <h3>名前</h3>
            <Group>
                <TextInput
                style={{ width: 170 }}
                label="姓"
                required
                {...join_event_form.getInputProps('familyname')}
                />
                <TextInput
                style={{ width: 170 }}
                label="名"
                required
                {...join_event_form.getInputProps('firstname')}
                />
            </Group>
            <h3>メールアドレス</h3>
            <TextInput
                icon={<At />}
                style={{ top: 20 }}
                label="メールアドレス"
                required
                {...join_event_form.getInputProps('email')}
            />
            <h3>備考</h3>
            <label htmlFor="question">備考（質問・特記事項などございましたら、ご記入ください↓）</label>
            <Textarea
                id='question'
                style={{ top: 20 }}
                autosize={true}
                {...join_event_form.getInputProps('question')}
            />
            <Button
                type="submit"
                color="red"
                margin="center"
                style={{ top: 20 }}
            >
                送信
            </Button>
            </form>
        </Modal>
    )
}
import { Chip } from "@mantine/core"
import { FC } from "react"

interface Props {
    tags: string,
    setTags: (array0: string) => void
}

export const TagChips: FC<Props> = ({tags, setTags}) => {
    return(
        <>
            <h3>タグの設定</h3>
            <Chip.Group multiple={false} value={tags} onChange={(e) => {setTags(e)}}>
                <Chip size="lg" value="農作業">農作業</Chip>
                <Chip size="lg" value="雪作業">雪作業</Chip>
                <Chip size="lg" value="ゴミ拾い">ゴミ拾い</Chip>
                <Chip size="lg" value="お祭り">お祭り</Chip>
                <Chip size="lg" value="年中行事">年中行事</Chip>
                <Chip size="lg" value="その他">その他</Chip>
            </Chip.Group>
        </>
    )
}
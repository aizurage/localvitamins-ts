import { FC, useState } from "react"
import { Chip } from "@mantine/core"
import { FieldValues, UseFormSetValue } from "react-hook-form"

interface Props {
    setValue: UseFormSetValue<FieldValues>
}

export const EventSearchTagInput: FC<Props> = ({ setValue }) => {
  const [ tags, setTags ] = useState("")
  const tagContents = [
    "農作業",
    "雪作業",
    "ゴミ拾い",
    "お祭り",
    "年中行事",
    "その他"
  ]

  return(
    <>
      <h3>タグの設定</h3>
      <Chip.Group
        multiple={false}
        value={tags}
        onChange={(e) => {
          setValue("tags", e)
          setTags(e)
        }}
      >
        {tagContents.map((tagContent, i) =>
          <Chip key={i} size="lg" value={tagContent}>
            {tagContent}
          </Chip>
        )}
      </Chip.Group>
    </>
  )
}

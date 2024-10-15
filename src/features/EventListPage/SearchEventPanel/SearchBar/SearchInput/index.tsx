import { FC } from "react"
import { TextInput } from "@mantine/core"
import { UseFormRegister, FieldValues } from "react-hook-form"
import styles from "./index.module.css"

interface Props {
  placeholder: string
  fieldname: string
  register: UseFormRegister<FieldValues>
}

export const SearchInput: FC<Props> = ({
  placeholder,
  fieldname,
  register,
}) => {
  return (
    <TextInput
      className={styles.searchBar}
      placeholder={placeholder}
      {...register(fieldname)}
    />
  )
}

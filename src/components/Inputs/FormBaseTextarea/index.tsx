import { FC, ReactNode } from "react"
import { Textarea } from "@mantine/core"
import { FieldValues, UseFormRegister } from "react-hook-form"
import styles from "./index.module.css"

export interface Props {
  required: boolean
  label?: string
  placeholder: string
  fieldname: string
  minRows: number
  register: UseFormRegister<FieldValues>
  autoSize?: boolean
  icon?: ReactNode
}

export const FormBaseTextarea: FC<Props> = ({
  required,
  label,
  placeholder,
  fieldname,
  minRows,
  register,
  autoSize,
  icon,
}) => {
  return (
    <Textarea
      className={styles.textarea}
      required={required}
      label={label}
      placeholder={placeholder}
      minRows={minRows}
      leftSection={icon}
      autosize={autoSize}
      {...register(fieldname)}
    />
  )
}

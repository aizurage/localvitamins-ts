import { FC, ReactNode } from "react"
import { Button } from "@mantine/core"
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { FormBaseInput } from "../../../Inputs/FormBaseInput"
import styles from "./index.module.css"

interface Props {
  placeholder: string
  fieldname: string
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
  previousValue: string
  icon?: ReactNode
}

export const EditFieldPanel: FC<Props> = ({
  placeholder,
  fieldname,
  register,
  setValue,
  previousValue,
  icon,
}) => {
  return (
    <div className={styles.field}>
      <FormBaseInput
        required={false}
        placeholder={placeholder}
        fieldname={fieldname}
        register={register}
        icon={icon}
      />
      <Button
        className={styles.cancelButton}
        onClick={() => {
          setValue(fieldname, previousValue)
        }}
      >
        キャンセル
      </Button>
    </div>
  )
}

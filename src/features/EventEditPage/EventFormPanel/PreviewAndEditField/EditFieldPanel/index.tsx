import { FC } from "react"
import { Button } from "@mantine/core"
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { FormBaseInput } from "../../../../../components/Inputs/FormBaseInput"
import styles from "./index.module.css"

interface Props {
    placeholder: string
    fieldname: string
    register: UseFormRegister<FieldValues>
    setValue: UseFormSetValue<FieldValues>
    previousValue: string
}

export const EditFieldPanel: FC<Props> = ({
  placeholder,
  fieldname,
  register,
  setValue,
  previousValue
}) => {
  return(
    <div className={styles.field}>
      <FormBaseInput
        required={false}
        placeholder={placeholder}
        fieldname={fieldname}
        register={register}
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

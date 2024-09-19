import { TextInput } from "@mantine/core"
import { FieldValues, UseFormRegister } from "react-hook-form"
import { FC, ReactNode } from "react"
import style from "./index.module.css"

export interface FormBaseInputProps {
    required: boolean
    label?: string
    placeholder: string
    fieldname: string
    register: UseFormRegister<FieldValues>
    icon?: ReactNode
}

export const FormBaseInput: FC<FormBaseInputProps> = ({
    required,
    label,
    placeholder,
    fieldname,
    register,
    icon
}) => {
    return(
        <TextInput
            className={style.FormBaseInputBasicStyle}
            required={required}
            label={label}
            placeholder={placeholder}
            leftSection={icon}
            {...register(fieldname)}
        />
    )
}
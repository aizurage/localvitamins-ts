import { FC } from "react"
import { FormBaseInputProps } from "../FormBaseInput"
import { PasswordInput as MantinePasswordInput } from "@mantine/core"
import styles from "./index.module.css"

interface PasswordInputProps extends FormBaseInputProps {
    description: string
}

export const PasswordInput: FC<PasswordInputProps> = ({
    required,
    label,
    placeholder,
    fieldname,
    register,
    description
}) => {
    return(
        <MantinePasswordInput
            className={styles.PasswordInputStyle}
            required={required}
            label={label}
            placeholder={placeholder}
            description={description}
            {...register(fieldname)}
        />
    )
}
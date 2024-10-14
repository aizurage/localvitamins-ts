import { FC, ReactNode } from "react"
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form"
import { EditFieldPanel } from "./EditFieldPanel"
import { PreviewPanel } from "./PreviewPanel"

interface Props {
    title: string
    content: string
    placeholder: string
    fieldname: string
    register: UseFormRegister<FieldValues>
    setValue: UseFormSetValue<FieldValues>
    icon?: ReactNode
}

export const PreviewAndEditField: FC<Props> = ({
  title,
  content,
  placeholder,
  fieldname,
  register,
  setValue,
  icon
}) => {
  return(
    <>
      <PreviewPanel title={title} content={content} />
      <EditFieldPanel
        placeholder={placeholder}
        fieldname={fieldname}
        register={register}
        setValue={setValue}
        previousValue={content}
        icon={icon}
      />
    </>
  )
}

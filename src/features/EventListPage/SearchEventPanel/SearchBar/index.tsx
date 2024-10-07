import { FC } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { useAppDispatch } from "../../../../app/hook"
import { setEventList } from "../../../../app/slices/eventListSlice"
import { searchEvent } from "../../controller/searchEvent"
import { SearchButton } from "./SearchButton"
import { SearchInput } from "./SearchInput"
import styles from "./index.module.css"

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm()
  const submit = (data: FieldValues) => {
    // eslint-disable-next-line no-irregular-whitespace
    const events = searchEvent(data.keyWords.trim().split(/[ 　]+/))
    dispatch(setEventList(events))
  }

  return(
    <>
      <p>キーワードは最大３つまで入力できます。</p>
      <p>
        複数のキーワードで検索をかけるときは、スペースで区切ってください。
      </p>
      <form
        className={styles.searchForm}
        onSubmit={handleSubmit(submit)}
      >
        <SearchInput
          placeholder="キーワードを入力"
          fieldname="keyWords"
          register={register}
        />
        <SearchButton />
      </form>
    </>
  )
}

import { FieldValues, useForm } from "react-hook-form"
import { SearchButton } from "./SearchButton"
import { SearchInput } from "./SearchInput"
import styles from "./index.module.css"
import { FC } from "react"

export const SearchBar: FC = () => {
  const { register, handleSubmit } = useForm()
  const _handleSubmit = (data: FieldValues) => {
    // TODO: 全角スペース もしくは 半角スペースで区切る処理が必要
    // submitContents(_data)
  }

  return(
    <>
      <p>キーワードは最大３つまで入力できます。</p>
      <p>
        複数のキーワードで検索をかけるときは、全角スペースで区切ってください。
      </p>
      <form className={styles.searchForm} onSubmit={handleSubmit(_handleSubmit)}>
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
import { Button, Input } from "@mantine/core"
import styles from "./index.module.css"

export const SearchBar = () => {
    return(
      <>
        <p>キーワードは最大３つまで入力できます。</p>
        <p>
          複数のキーワードで検索をかけるときは、全角スペースで区切ってください。
        </p>
        <form className={styles.searchForm} onSubmit={search_keywords_form.onSubmit(search_event)}>
            <Input
              placeholder="キーワードを入力"
              className={styles.searchBar}
              {...search_keywords_form.getInputProps('keywords')}
            />
            <Button className="search_button" type="submit">
              検索
            </Button>
        </form>
      </>
    )
}
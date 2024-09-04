import { Button } from "@mantine/core"
import { Link } from "react-router-dom"
import styles from "./index.module.css"

export const EventOwnerOptionPanel = () => {
    return (
      <div className={styles.ownerOption}>
        <Button
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
          component={Link}
          to={`/eventmemberslist/${props.row.id}`}
        >
          参加者リスト表示
        </Button>{' '}
        <Button
          color="dark"
          radius={'xl'}
          onClick={() => setOpened(true)}
        >
          消去
        </Button>
        <Button
          radius={'xl'}
          className={styles.eventEdit}
          component={Link}
          to={`/eventedit/${props.row.id}`}
        >
          編集
        </Button>
      </div>
    )
}
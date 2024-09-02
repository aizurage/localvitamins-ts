import { Button } from "@mantine/core";

export const FilteringOwnersEventButton = () => {
    return(
        <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            onClick={() => {downloadMyEventData(); setIsOnlyMyEvent(true)}}
        >
            自分のイベントを表示
        </Button> 
    )
}
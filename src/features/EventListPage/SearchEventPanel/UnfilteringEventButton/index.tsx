import { Button } from "@mantine/core";

export const UnfilteringEventButton = () => {
    return(
        <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            onClick={() => {downloadEventData(); setIsOnlyMyEvent(false)}}
        >
            全イベントを表示
        </Button> 
    )
}
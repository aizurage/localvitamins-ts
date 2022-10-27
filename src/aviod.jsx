import { Chips, Chip } from "@mantine/core";
export function Avoid(){
    return(
        <Chips position="center">
          <Chip value="1">Single chip</Chip>
          <Chip value="2">Can be selected</Chip>
          <Chip value="3">At a time</Chip>
        </Chips>
    );
}

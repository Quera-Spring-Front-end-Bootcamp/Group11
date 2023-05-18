import { Button } from "@mantine/core";
import type { ButtonProps } from "@mantine/core";

 const MantineButton = ({children , ...otherProps} : ButtonProps) => {
    return (
<Button {...otherProps}>
{children}
</Button>)
}


export default MantineButton;
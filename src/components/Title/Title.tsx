  import { Title as MantineTitle } from "@mantine/core";
  import type { TitleProps as MantineTitleProps } from "@mantine/core";
  
  type TitleProps = Pick<
  MantineTitleProps,
  'align' | 'children' | 'color' | 'gradient' | 'size' | 'weight'
  >;
  
  const Title = (props: TitleProps) => {
    return <MantineTitle {...props}></MantineTitle>;
  };
  
  export default Title;
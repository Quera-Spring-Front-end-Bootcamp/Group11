import { Anchor as MantineAnchor } from '@mantine/core';
import type { AnchorProps as MantineAnchorProps } from "@mantine/core";

type AnchorProps = Pick<
  MantineAnchorProps,
  'align' | 'children' | 'color' | 'size' | 'weight'
>;

const Anchor = (props: AnchorProps) => {
  return <MantineAnchor {...props}></MantineAnchor>;
};
export default Anchor;
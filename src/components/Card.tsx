import { Card as MantineCard } from '@mantine/core';
import type { CardProps as MantineCardProps } from '@mantine/core';

type CardProps = Pick<
  MantineCardProps,
  'className' | 'shadow' | 'padding' | 'radius' | 'children'
>;

const Card = (props: CardProps) => {
  return <MantineCard {...props}></MantineCard>;
};

export default Card;

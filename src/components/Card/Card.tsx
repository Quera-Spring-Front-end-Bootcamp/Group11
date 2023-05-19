import { Card as MantineCard } from '@mantine/core';
import type { CardProps as MantineCardProps } from '@mantine/core';

type CardProps = Pick<
  MantineCardProps,
  'className' | 'shadow' | 'padding' | 'radius' | 'children'
>;

const Card = (props: CardProps) => {
  return (
    <MantineCard
      radius='20px'
      shadow='0px 12px 50px rgba(0, 0, 0, 0.18)'
      {...props}></MantineCard>
  );
};

export default Card;

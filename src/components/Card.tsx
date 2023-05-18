import { Card as MantineCard } from '@mantine/core'
import { ReactNode } from 'react'

type CardProps = {
	shadow: 'sm' | 'md' | 'lg' | 'xl'
	padding: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	radius: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className: string
  children: ReactNode
}

const Card = ({
	shadow,
	padding,
	radius,
  className,
  children
}: CardProps) => {
  return (
    <MantineCard
      className={className}
      shadow={shadow}
      padding={padding}
      radius={radius}
    >
			{children}
    </MantineCard>
  )
}

export default Card
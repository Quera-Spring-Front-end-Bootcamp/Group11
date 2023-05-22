import { Accordion as MantineAccordion } from '@mantine/core';

import type { AccordionProps } from '@mantine/core';

const Accordion = ({children , ...otherProps}:AccordionProps) => {
  return (
    <MantineAccordion
      styles={() => ({
        chevron: {
          marginLeft: '8px'
        },
        item: {
          border: 'none',
        },
        control : {
          padding: '0px',

        },
        label: {
          textAlign: 'right',
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '25px',
        },
      })}>
      <MantineAccordion.Item value='workSpaces'>
        <MantineAccordion.Control>ورک‌اسپیس‌ها</MantineAccordion.Control>
        <MantineAccordion.Panel>{children}</MantineAccordion.Panel>
      </MantineAccordion.Item>
    </MantineAccordion>
  );
};

export default Accordion;

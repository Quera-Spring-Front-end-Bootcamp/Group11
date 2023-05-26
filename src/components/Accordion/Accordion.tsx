import { Accordion as MantineAccordion } from '@mantine/core';

import type { AccordionProps as MantineAccordionProps } from '@mantine/core';

interface AccordionProps extends MantineAccordionProps {
  inputArray: any;
  labelFW: string;
  labelFS: string;
  labelLH: string;
}
const Accordion = ({
  inputArray,
  labelFW,
  labelFS,
  labelLH,
}: AccordionProps) => {
  // Pattern of AccArray:
  // AccArray = [{id: id , AccTitle: AccTitle , AccDetails: [AccDetails]}]
  const Acc = inputArray.map((item) => {
    let details = [...item.AccDetail];

    return (
      <MantineAccordion.Item value={item.AccTitle}>
        <MantineAccordion.Control>{item.AccTitle}</MantineAccordion.Control>
        {details.map((detail) => (
          <MantineAccordion.Panel>{detail}</MantineAccordion.Panel>
        ))}
      </MantineAccordion.Item>
    );
  });

  return (
    <MantineAccordion
      styles={() => ({
        chevron: {
          marginLeft: '8px',
        },
        item: {
          border: 'none',
        },
        control: {
          padding: '0px',
        },
        label: {
          textAlign: 'right',
          fontWeight: labelFW,
          fontSize: labelFS,
          lineHeight: labelLH,
        },
      })}>
      {Acc}
    </MantineAccordion>
  );
};

export default Accordion;

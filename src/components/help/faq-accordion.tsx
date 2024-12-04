'use client';

import { Accordion, AccordionItem } from '@nextui-org/react';

interface Props {
  data: { question: string; answer: string }[];
  id: string;
  title: string;
}

const FaqAccordion = ({ data, id, title }: Props) => {
  return (
    <div className="flex flex-col gap-2 -mt-12" id={id}>
      <h3 className="text-2xl font-semibold pb-2">{title}</h3>
      <Accordion variant="splitted">
        {data.map(({ question, answer }) => (
          <AccordionItem
            key={question}
            classNames={{ title: 'text-lg', content: 'text-sm font-light' }}
            aria-label={question}
            title={question}
          >
            {answer}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqAccordion;

import { IStay } from '@/types';
import { numberToCurrency } from '@/utils';
import { Card, CardBody, CardFooter, Chip, Image } from '@nextui-org/react';
import { useMemo } from 'react';

const StayCard = ({ avatar, name, summary, type, accommodation }: IStay) => {
  const minPrice = useMemo(() => Math.min(...accommodation.map((a) => a.price)), [accommodation]);
  return (
    <Card className="flex flex-col w-62" isPressable shadow="none">
      <CardBody className="p-0">
        <Image src={avatar} width="full" alt={name} height={150} radius="none" className="h-40 w-full object-cover" />
      </CardBody>
      <CardFooter className="flex flex-col gap-4 border border-accentGray2/20 px-4 pb-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-accentGray underline">{type}</p>
            <Chip size="sm" className="text-white text-sm" color="primary" radius="sm">
              {numberToCurrency(minPrice)}
              <span className="text-[10px] font-light"> / night</span>
            </Chip>
          </div>
          <h3 className="text-base text-left font-bold">{name}</h3>
          <p className="text-xs text-left font-normal">{summary}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default StayCard;

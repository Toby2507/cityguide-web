import { IconType } from 'react-icons';

interface Props {
  id: string;
  title: string;
  value: number;
  Icon: IconType;
}

const MetricCard = ({ id, title, value, Icon }: Props) => {
  return (
    <article className="flex-1 flex flex-col border border-primary rounded-t-2xl">
      <div className="flex items-center gap-4 p-3">
        <div className="grid place-items-center bg-primary h-12 w-12 rounded-lg">
          <Icon className="text-white text-2xl" />
        </div>
        <div className="flex flex-col">
          <p className="text-accentGray text-xs font-medium">{title}</p>
          <p className="text-sm font-medium">{value}</p>
        </div>
      </div>
      <div className="flex flex-col -mt-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0075FF"
            fillOpacity="1"
            d="M0,192L120,170.7C240,149,480,107,720,106.7C960,107,1200,149,1320,170.7L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
      </div>
    </article>
  );
};

export default MetricCard;

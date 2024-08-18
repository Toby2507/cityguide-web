import { Button } from '@nextui-org/react';

interface Props {
  isLoading: boolean;
  nextText?: string;
  next: () => void;
  previous: () => void;
}

const CreateNavButtons = ({ isLoading, nextText, next, previous }: Props) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button className="text-sm font-semibold px-14" color="primary" radius="full" variant="flat" onPress={previous}>
        Previous
      </Button>
      <Button
        className="text-sm font-semibold px-14"
        color="primary"
        radius="full"
        variant="solid"
        onPress={next}
        isLoading={isLoading}
      >
        {nextText || 'Next'}
      </Button>
    </div>
  );
};

export default CreateNavButtons;

import { Button } from '@nextui-org/react';

interface ICreateStayButtons {
  isLoading: boolean;
  nextText?: string;
  next: () => void;
  previous: () => void;
}

const CreateStayButtons = ({ isLoading, nextText, next, previous }: ICreateStayButtons) => {
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

export default CreateStayButtons;

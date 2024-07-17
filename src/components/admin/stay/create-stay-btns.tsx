import { Button } from '@nextui-org/react';

interface ICreateStayButtons {
  isLoading: boolean;
  next: () => void;
  previous: () => void;
}

const CreateStayButtons = ({ isLoading, next, previous }: ICreateStayButtons) => {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button className="text-sm font-semibold px-14" color="primary" radius="full" variant="flat" onClick={previous}>
        Previous
      </Button>
      <Button
        className="text-sm font-semibold px-14"
        color="primary"
        radius="full"
        variant="solid"
        onClick={next}
        isLoading={isLoading}
      >
        Next
      </Button>
    </div>
  );
};

export default CreateStayButtons;

import { Button, Input } from '@nextui-org/react';

const SubscribeBox = () => {
  return (
    <section className="bg-bgLightBlue py-28">
      <div className="container px-10 mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-primary text-4xl font-bold">Subscribe to our newsletter</h2>
          <p className="text-base font-medium text-center w-11/12">
            Sign up to get marketing emails from Cityguidex.com, including promotions, rewards, travel experiences, and
            information about Booking.com and Cityguidex.com Transport Limited’s products and services.
          </p>
          <Input
            type="email"
            name="email"
            label="Your email address"
            size="lg"
            radius="lg"
            endContent={
              <Button
                className="text-primary text-sm font-semibold px-6 top-1 -right-1"
                color="secondary"
                radius="sm"
                size="lg"
              >
                Subscribe
              </Button>
            }
            className="mt-6 shadow-xl"
            classNames={{ inputWrapper: 'pl-6' }}
          />
        </div>
      </div>
    </section>
  );
};

export default SubscribeBox;

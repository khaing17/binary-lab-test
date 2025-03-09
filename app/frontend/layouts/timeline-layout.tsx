import { Head } from "@inertiajs/react";
import { cn } from "../lib/utils";

interface TimelineLayoutProp {
  children: React.ReactNode;
  className?: string;
}
const TimelineLayout: React.FC<TimelineLayoutProp> = ({
  children,
  className,
}) => {
  return (
    <>
      <Head>
        <title>Timeline</title>
      </Head>
      <div
        className={cn(
          "min-h-screen bg-gray-800 text-white flex justify-center",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
};

export default TimelineLayout;

import { twMerge } from "tailwind-merge";

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={twMerge("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
};

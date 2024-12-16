import { HTMLAttributes, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  imageUrl?: string;
}

const Card = ({
  title,
  description,
  imageUrl,
  children,
  className,
  ...restProps
}: Props) => {
  return (
    <div
      className={twMerge(
        "bg-background border border-border rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:shadow-primary/20 hover:ring-1 hover:ring-primary/20 transition-shadow duration-300",
        className
      )}
      {...restProps}
    >
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}

      <div className="p-4">
        {title && <h2 className="text-xl font-bold mb-2">{title}</h2>}

        {description && (
          <p className="mb-4 text-foreground/50">{description}</p>
        )}

        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

export default Card;

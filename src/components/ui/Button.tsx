import { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonClasses = cva(
  "inline-flex justify-center items-center rounded-lg font-medium disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        danger:
          "bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
      size: {
        icon: "h-10 w-10",
        sm: "h-8 px-2",
        md: "h-10 px-4",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {}

const Button = ({ variant, className, size, ...restProps }: Props) => {
  return (
    <button
      className={buttonClasses({ variant, size, className })}
      {...restProps}
    />
  );
};

export default Button;

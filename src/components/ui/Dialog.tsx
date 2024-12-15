import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import Button from "./Button";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const Dialog = ({
  isOpen,
  setIsOpen,
  title,
  children,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-primary-foreground rounded-lg shadow-lg">
        {title && <div className="mb-4 text-lg font-semibold">{title}</div>}

        <div className="mb-4 text-sm">{children}</div>

        <div className="flex justify-end space-x-2">
          <Button variant={"danger"} onClick={() => setIsOpen(false)}>
            {cancelText}
          </Button>
          {onConfirm && <Button onClick={onConfirm}>{confirmText}</Button>}
        </div>
      </div>
    </div>
  );
};

export default Dialog;

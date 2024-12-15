import { useState, ReactNode, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export interface MenuItem {
  label: string;
  icon: ReactNode;
  navigateTo?: string;
  onClick?: () => void;
}

interface Props extends PropsWithChildren {
  items: MenuItem[];
}

const DropdownMenu = ({ items, children }: Props) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.navigateTo) {
      navigate(item.navigateTo);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen((prev) => !prev)}>{children}</button>

      {isOpen && (
        <ul className="absolute right-0 z-10 w-48 mt-2 border bg-primary-foreground rounded shadow-lg">
          <p className="px-2 pt-2 pb-4 mt-2 border-b">Menu</p>

          {items.map((item, idx) => (
            <li
              key={idx}
              onClick={() => handleItemClick(item)}
              className="flex items-center p-2 space-x-2 cursor-pointer"
            >
              {item.icon && <span>{item.icon}</span>}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownMenu;

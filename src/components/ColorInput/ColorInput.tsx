import { IconType } from 'react-icons';
type ColorInputProps = {
  bg: string | null;
  icon?: IconType;
  width: string;
  height: string;
  radius: string;
  selected?: boolean;
  onClick?: () => void | undefined;
};
const ColorInput = ({
  bg,
  icon: Icon,
  width,
  height,
  selected = false,
  onClick,
}: ColorInputProps) => {
  return (
    <div
      style={{ backgroundColor: bg as any }} //somehow tailwind is not working with template literals in this case
      className={`
        cursor-pointer
        transition grid
        justify-center
        items-center 
        ${selected ? 'scale-[1.40]' : 'scale-100'}
        bg-{${bg}}
        h-[${height}]
        w-[${width}]`}
      onClick={onClick}>
      {Icon && <Icon size={bg ? 12 : 16} />}
    </div>
  );
};

export default ColorInput;

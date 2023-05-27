import { IconType } from 'react-icons';
type ColorInputProps = {
  bg: string | null;
  icon?: IconType;
  width: string;
  height: string;
  radius: '100%' | '2px';
  selected?: boolean;
  onClick?: () => void | undefined;
};
const ColorInput = ({
  bg,
  icon: Icon,
  width,
  height,
  selected = false,
  radius,
  onClick,
}: ColorInputProps) => {
  return (
    <div
      style={{
        backgroundColor: bg as any,
        height,
        width,
        borderRadius: radius,
      }} //somehow tailwind is not working with template literals in this case
      className={`
        cursor-pointer
        transition grid
        justify-center
        items-center 
        ${selected ? 'scale-[1.40]' : 'scale-100'}`}
      onClick={onClick}>
      {Icon && <Icon size={bg ? 12 : 16} />}
    </div>
  );
};

export default ColorInput;

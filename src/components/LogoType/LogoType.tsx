import { Anchor as MantineAnchor } from '../Anchor';
type LogoType = {
  text?: string;
};
const LogoType = ({ text = 'تسک مستر' }: LogoType) => {
  return (
    <MantineAnchor
      //@ts-ignore
      href='/'
      title='تسک مستر'
      className='font-extrabold text-32 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500'>
      {text}
    </MantineAnchor>
  );
};
export default LogoType;

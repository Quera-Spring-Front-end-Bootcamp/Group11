import { ReactNode } from 'react';
import LogoType from '../../LogoType/LogoType';
interface BaseSideBarProp {
  children: ReactNode;
}

const BaseSideBar = ({ children }: BaseSideBarProp) => {
  return (
    <div className='select-none flex flex-col w-[100%] h-[100vh] pt-[40px] pr-[50px] pl-[16px] border-l-[#AAAAAA] border-[0.5px]'>
      <LogoType />
      {children}
    </div>
  );
};

export default BaseSideBar;

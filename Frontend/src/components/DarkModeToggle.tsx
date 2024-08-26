import useDarkMode from '@/hooks/useDarkMode';
import React from 'react';
import { IoSunnyOutline } from "react-icons/io5";
import { RxMoon } from "react-icons/rx";

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  return (
    <div className="flex items-center ">
        <div></div>
      {isDarkMode ? (
        <div className='p-2 border border-white  rounded  hover:bg-white hover:bg-opacity-35 cursor-pointer transition-all duration-300 ease-in-out' onClick={() => setIsDarkMode(false)}>
            <IoSunnyOutline 
                className="w-8 h-8 md:w-6 md:h-6 dark:text-white cursor-pointer"
                onClick={() => setIsDarkMode(false)}
        />
        </div>
        
      ) : (
        <div className='p-2 border border-black rounded hover:bg-black hover:bg-opacity-10 cursor-pointer transition-all duration-300 ease-in-out ' 
            onClick={() => setIsDarkMode(true)}
        >
            <RxMoon 
            className="w-8 h-8 md:w-6 md:h-6 text-black cursor-pointer "
            
            />
        </div>
      )}
    </div>
  );
};

export default DarkModeToggle;
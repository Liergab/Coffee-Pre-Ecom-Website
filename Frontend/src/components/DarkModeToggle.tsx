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
                className="w-4 h-4 md:w-4 md:h-4 dark:text-white cursor-pointer"
                onClick={() => setIsDarkMode(false)}
        />
        </div>
        
      ) : (
        <div className='p-2 border border-black rounded hover:bg-black hover:bg-opacity-10 cursor-pointer transition-all duration-300 ease-in-out ' 
            onClick={() => setIsDarkMode(true)}
        >
            <RxMoon 
            className="w-4 h-4 md:w-4 md:h-4 text-black cursor-pointer "
            
            />
        </div>
      )}
    </div>
  );
};

export default DarkModeToggle;
import { useEffect, useState } from 'react';

const useDarkMode = (): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return [isDarkMode, setIsDarkMode];
};

export default useDarkMode;
import { createContext, useContext, useState } from "react";

interface SideBarContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggle: () => void;
}

// Создаём контекст
const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

// Провайдер — оборачивает всё приложение (в App.tsx)
export const SideBarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <SideBarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </SideBarContext.Provider>
  );
};

// Кастомный хук для использования контекста
export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }
  return context;
};

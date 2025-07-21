import { createContext, useContext, useState } from "react";

interface SideBarContextType {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

export const SideBarProvider: React.FC<({ children: React.ReactNode })> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <SideBarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SideBarContext.Provider>
    );
}

export const useSideBar = () => {
    const context = useContext(SideBarContext);
    if (!context) {
        throw new Error();
    }
    return context;
};

export default SideBarContext;
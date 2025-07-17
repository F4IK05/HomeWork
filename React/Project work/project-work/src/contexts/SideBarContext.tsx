import { createContext } from "react";

interface SideBarContextType {
    isOpen: boolean;
}

export const SideBarContext = createContext<SideBarContextType | undefined>(undefined);

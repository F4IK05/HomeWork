import SideBarContext from "@/contexts/SideBarContext";
import { useContext } from "react";

export const useSideBar = () => {
    const context = useContext(SideBarContext);
    if (!context) {
        throw new Error();
    }
    return context;
};
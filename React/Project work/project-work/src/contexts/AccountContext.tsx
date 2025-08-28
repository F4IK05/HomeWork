import { createContext, useState } from "react";

interface AccountContextType {
    activeSection: string;
    isPasswordModalOpen: boolean;
    setActiveSection: (section: string) => void;
    setIsPasswordModalOpen: (open: boolean) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeSection, setActiveSection] = useState('profile');
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    return (
        <AccountContext.Provider value={{ activeSection, setActiveSection, isPasswordModalOpen, setIsPasswordModalOpen }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContext;
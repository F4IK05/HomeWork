import { createContext, useState } from "react";

interface AccountContextType {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeSection, setActiveSection] = useState('profile');

    return (
        <AccountContext.Provider value={{ activeSection, setActiveSection }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContext;
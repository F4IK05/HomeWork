import Navbar from "../../components/ui/header/Navbar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex flex-1 items-center justify-center">{children}</main>

        </div>
    );
};

export default Layout;
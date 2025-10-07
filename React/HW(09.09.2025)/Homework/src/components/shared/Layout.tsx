import Navbar from "../ui/header/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                {/* Navbar сверху */}
                <Navbar />

                <main className="flex-1 px-6 py-4">
                    {children}
                </main>
            </div>
        </>

    );
};

export default Layout;
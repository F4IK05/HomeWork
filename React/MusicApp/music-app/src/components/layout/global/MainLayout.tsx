import { useResponsiveUI } from "@/hooks/useResponsiveUI";
import SideBar from "./SideBar";
import MusicPlayer from "./music/MusicPlayer";
import NavBar from "./navbar/NavBar";
import { useSideBar } from "@/hooks/useSideBar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen } = useSideBar();
  const { isMobile } = useResponsiveUI();

  return (
    <div className="bg-[#111113] text-white min-h-screen transition-all duration-300">
      <SideBar />
      <div className={`transition-all duration-300 ${isOpen ? "md:ml-64" : "md:ml-16"}`}>
        <NavBar />
        <main className="pt-16 px-4 sm:px-6 lg:px-8">{children}</main>
        <MusicPlayer isMobile={isMobile} />
      </div>
    </div>
  );
};

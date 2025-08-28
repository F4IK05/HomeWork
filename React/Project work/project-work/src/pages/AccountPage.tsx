import MainContent from "@/components/Account/MainContent";
import SideBar from "@/components/Account/SideBar";
import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Toaster } from "react-hot-toast";

const AccountPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }

    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="bg-[#171719] flex justify-center items-center">
      <div className="max-w-[1000px] w-full m-auto text-white flex h-screen relative">
        <Toaster position="top-center" reverseOrder={false} toastOptions={{
          style: {
            background: '#1f1f23',
            color: '#fff',
            padding: '12px 16px',
            borderRadius: '8px',
            backdropFilter: "blur(6px)"
          }
        }}/>


        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40"></div>
        )}
        {/* Боковое меню для desktop */}
        <div className="hidden md:block">
          <SideBar/>
        </div>
        

        {/* Боковое меню для mobile (выезжающее) */}
        <div ref={modalRef} className={`fixed top-0 left-0 h-full w-fit bg-[#1f1f23] transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-50 md:hidden`}>
          <div className="p-4 flex justify-between items-center border-b border-gray-700">
            <span className="font-semibold">Меню</span>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <SideBar />
        </div>

        {/* Кнопка меню (только на телефоне) */}
        <button className="absolute top-4 left-4 z-40 md:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>

        {/* Контент */}
        <div className="flex-1 overflow-auto">
          <MainContent />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

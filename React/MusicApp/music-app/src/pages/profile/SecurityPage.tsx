import React, { useState } from "react";
import { ChangePasswordModal } from "@/components/profile/ChangePasswordModal";
import { ProfileService } from "@/services/ProfileService";
import { ActionButton } from "@/components/ui/ActionButton";
import { KeyRound } from "lucide-react";

const GLASS = "bg-[#2a2a2e]/60 backdrop-blur-sm border border-white/10";

const SecurityPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [isPwdOpen, setIsPwdOpen] = useState(false);

    const handlePasswordChange = async (p: { oldPassword: string; newPassword: string }) => {
        await ProfileService.changePassword(p.oldPassword, p.newPassword);
      };

    return (
        <main className="fade-in">
            <div className="rounded-2xl p-5 md:p-6 bg-white/5 border border-white/10 mb-6">
                <h1 className="text-2xl font-semibold">Security</h1>
                <p className="text-sm text-white/70 mt-1">Manage your password and account safety.</p>
            </div>

            <section className={`rounded-2xl p-5 md:p-6 ${GLASS}`}>
                <ActionButton
                    icon={<KeyRound className="w-5 h-5" />}
                    label="Change Password"
                    onClick={() => setIsPwdOpen(true)}
                />
            </section>

            <ChangePasswordModal
                    open={isPwdOpen}
                    onClose={() => setIsPwdOpen(false)}
                    onSubmit={handlePasswordChange}
                  />
        </main>
    );
};

export default SecurityPage;

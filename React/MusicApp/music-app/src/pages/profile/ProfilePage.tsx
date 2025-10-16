import React, { useEffect, useMemo, useState } from "react";
import { AvatarUploader } from "@/components/profile/AvatarUploader";
import { EditProfileModal } from "@/components/profile/EditProfileModal";
import { ChangePasswordModal } from "@/components//profile/ChangePasswordModal";
import { ActionButton } from "@/components/ui/ActionButton";
import type { UserProfile } from "@/types/ProfileData";
import { ProfileService } from "@/services/ProfileService";
import { Pencil } from "lucide-react";

const glassPanel =
  "bg-[#2a2a2e]/60 backdrop-blur-sm border border-white/10";

const ProfilePage: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPwdOpen, setIsPwdOpen] = useState(false);

  useEffect(() => {
    document.title = "Profile";
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    (async () => {
      try {
        const me = await ProfileService.getUserProfile();
        setProfile(me);
        setError(null);
      } catch (e) {
        console.error(e);
        setError("Не удалось загрузить профиль.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // #region Derived
  const emailMasked = useMemo(() => {
    if (!profile?.email) return "";
    const [name, domain] = profile.email.split("@");
    if (!name || !domain) return profile.email;
    const masked =
      name.length <= 2 ? name[0] + "*" : name[0] + "*".repeat(name.length - 2) + name.slice(-1);
    return `${masked}@${domain}`;
  }, [profile?.email]);
  // #endregion

  const handleSaveUserName = async (userName: string) => {
    if (!profile) return;
    const updated = await ProfileService.updateProfile({ userName });
    setProfile(updated);
  };

  const handlePasswordChange = async (p: { oldPassword: string; newPassword: string }) => {
    await ProfileService.changePassword(p.oldPassword, p.newPassword);
  };

  const handleAvatarUploaded = async (url: string) => {
    // если upload-эндпоинт сам НЕ обновляет профиль — сохраняем вручную
    const updated = await ProfileService.updateProfile({ avatarUrl: url });
    setProfile(updated);
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center bg-[#1b1b1f]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-[#3b82f6] animate-spin" />
          <p className="text-white/70 text-sm tracking-wide">Загрузка профиля…</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="w-full flex items-center justify-center bg-[#1b1b1f]">
        <div className="text-white/80">{error ?? "Профиль не найден"}</div>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#1b1b1f] text-white fade-in">
      <section className="relative">
        <div className="mx-auto">
          <div className={`rounded-2xl p-5 md:p-6 ${glassPanel}`}>
            {/* Header content: responsive row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 md:gap-6">
              {/* Avatar + camera overlay */}
              <AvatarUploader
                currentAvatarUrl={profile.avatarUrl}
                onUploaded={handleAvatarUploaded}
                endpoint="http://localhost:5017/api/Account/upload-avatar"
              />

              {/* Name + email */}
              <div className="min-w-0 sm:flex-1">
                <div className="text-2xl md:text-3xl font-semibold truncate">{profile.userName}</div>
                <div className="text-white/60 text-sm truncate">{emailMasked}</div>
              </div>

              {/* Desktop actions */}
              <div className="hidden sm:flex flex-col gap-3 sm:ml-auto w-64">
                <ActionButton
                  icon={<Pencil className="w-5 h-5" />}
                  label="Edit Profile"
                  onClick={() => setIsEditOpen(true)}
                />
                
              </div>
            </div>

            {/* Mobile actions under avatar */}
            <div className="mt-4 flex sm:hidden flex-col gap-2">
              <ActionButton
                icon={<Pencil className="w-5 h-5" />}
                label="Edit Profile"
                onClick={() => setIsEditOpen(true)}
              />
              
            </div>
          </div>
        </div>
      </section>

      {/* Info section (extend later) */}
      <section className="mx-auto md:py-10">
        <div className={`rounded-2xl p-5 md:p-6 ${glassPanel}`}>
          <h2 className="text-lg font-semibold mb-2">Аккаунт</h2>
          <div className="grid gap-3 md:gap-4 md:grid-cols-2">
            <InfoCard label="Username" value={`@${profile.userName}`} />
            <InfoCard label="Email" value={profile.email} />
          </div>
        </div>
      </section>

      {/* Modals */}
      <EditProfileModal
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialUserName={profile.userName}
        onSave={handleSaveUserName}
      />

      <ChangePasswordModal
        open={isPwdOpen}
        onClose={() => setIsPwdOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </main>
  );
};

// #region InfoCard
const InfoCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="rounded-xl px-4 py-3 bg-white/5 border border-white/10">
    <div className="text-white/60 text-xs uppercase tracking-wider">{label}</div>
    <div className="text-sm md:text-base truncate">{value}</div>
  </div>
);
// #endregion

export default ProfilePage;

import React, { useState } from "react";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: { oldPassword: string; newPassword: string }) => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ oldPassword, newPassword });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Окно модалки */}
      <div className="bg-[#2a2a2e] border border-white/10 rounded-2xl shadow-lg p-6 w-full max-w-md animate-modal">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-white/70">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-[#1f1f23] border border-white/10 rounded-lg focus:outline-none focus:border-[#3b82f6] transition"
              required
            />
          </div>

          <div>
            <label className="text-sm text-white/70">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 w-full px-3 py-2 bg-[#1f1f23] border border-white/10 rounded-lg focus:outline-none focus:border-[#3b82f6] transition"
              required
              minLength={6}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] transition"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

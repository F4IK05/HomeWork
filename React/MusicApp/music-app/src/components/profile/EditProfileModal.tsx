import React, { useState } from "react";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  initialUserName: string;
  onSave: (newName: string) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  open,
  onClose,
  initialUserName,
  onSave,
}) => {
  const [userName, setUserName] = useState(initialUserName);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(userName);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      {/* Контейнер модалки */}
      <div
        className="bg-[#2a2a2e] border border-white/10 rounded-2xl shadow-lg p-6 w-full max-w-md animate-modal"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm text-white/70">Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="px-3 py-2 bg-[#1f1f23] border border-white/10 rounded-lg focus:outline-none focus:border-[#3b82f6] transition"
          />

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

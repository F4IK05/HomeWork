import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";

type Props = {
  currentAvatarUrl?: string;
  onUploaded: (newUrl: string) => void;
  endpoint?: string; // backend upload endpoint
};

export const AvatarUploader: React.FC<Props> = ({
  currentAvatarUrl,
  onUploaded,
  endpoint = "http://localhost:5017/api/Account/upload-avatar",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(currentAvatarUrl);
  const [uploading, setUploading] = useState(false);

  const handleUploadClick = () => inputRef.current?.click();

  const handleFile = async (file: File) => {
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      setUploading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      const data = await response.json();
      if (data?.url) onUploaded(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Ошибка загрузки фото");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group w-fit">
      {/* Avatar */}
      <img
        src={preview}
        alt="Avatar"
        className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border border-white/20 shadow-lg transition-transform duration-300 group-hover:scale-105"
      />

      {/* Hover overlay */}
      <div
        onClick={handleUploadClick}
        className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center cursor-pointer"
      >
        <Camera className="w-8 h-8 text-white" />
      </div>

      {/* Loading layer */}
      {uploading && (
        <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white/30 border-t-[#3b82f6] rounded-full animate-spin" />
        </div>
      )}

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
};

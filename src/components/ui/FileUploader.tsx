import { Upload } from "lucide-react";
import React, { useState, useRef } from "react";
// import { uploadFile } from "../services/uploadService";

interface Props {
  onUploadSuccess?: (url: string) => void;
  defaultValue?: string;
}

const FileUploader = ({ onUploadSuccess, defaultValue }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValue ?? null
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      //   const result = await uploadFile(file);
      //   onUploadSuccess?.(result.url);
      //   alert("Upload successful!");
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="max-w-xl flex flex-col items-center gap-4 border-2 border-background border-dashed p-6 rounded-lg shadow-md">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-48 h-48 object-cover rounded-md"
          onClick={triggerFileInput}
        />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload />

          <p className="text-sm text-muted-foreground">
            Select an{" "}
            <span
              onClick={triggerFileInput}
              className="text-primary underline cursor-pointer"
            >
              {" "}
              image file{" "}
            </span>
          </p>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="flex gap-2">
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ${
            (!file || isUploading) && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FileUploader;

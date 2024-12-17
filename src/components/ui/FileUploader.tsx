import React, { useState, useRef } from "react";
import { axiosInstance } from "@/libs/axios";
import { AxiosError } from "axios";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import Button from "./Button";

interface Props {
  onUploadSuccess: (url: string) => void;
  defaultValue?: string;
  formName?: string;
}

const FileUploader = ({ onUploadSuccess, defaultValue, formName }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [filename, setFilename] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string>(defaultValue ?? "");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPreviewUrl("");
      setFile(selectedFile);
      setFilename(selectedFile.name);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);

    try {
      const coverImageData = new FormData();
      coverImageData.append("files", file);

      const { data } = await axiosInstance.post("/upload", coverImageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onUploadSuccess(data[0].url);
      setPreviewUrl(data[0].url);
    } catch (error) {
      const isAxiosError = error instanceof AxiosError;
      toast.error(
        isAxiosError
          ? error.response?.data.message ?? error.message
          : "Internal server error"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full flex flex-col items-center gap-4 border-2 border-secondary border-dashed p-6 rounded-lg shadow-md">
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-48 h-48 object-cover rounded-md"
          onClick={triggerFileInput}
        />
      ) : filename.length ? (
        <div className="flex items-center justify-center">
          <p className="font-semibold text-muted-foreground">{filename}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload />

          <p className="text-sm text-muted-foreground">
            Select an{" "}
            <span
              onClick={triggerFileInput}
              className="text-primary cursor-pointer"
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
        name={formName}
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        onClick={handleUpload}
        size={"sm"}
        disabled={!filename.length || !!previewUrl.length || isUploading}
        className="mt-2 text-sm rounded-md"
      >
        {isUploading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};

export default FileUploader;

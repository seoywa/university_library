/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
//@ts-expect-unused-vars
"use client";

import { useToast } from "@/hooks/use-toast";
import config from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import Image from "next/image";
import { useRef, useState } from "react";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error("Authentication request failed", error.message);
  }
};

interface Props {
  onFileChange: (filePath: string) => void;
  type: "Image" | "Video";
  accept: string;
  placeholder: string;
  folder: string;
  variant: "dark" | "light";
  value?: string
}

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
  value
}: Props) => {
  const { toast } = useToast();
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string | null }>({ filePath: value ?? null});
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === "dark"
        ? "bg-dark-300"
        : "bg-light-600 border-gray-100 border",
    placeholder: variant === "dark" ? "text-light-1000" : "text-slate-500",
    text: variant === "dark" ? "text-light-1000" : "text-dark-400",
  };

  const onError = (error: any) => {
    console.log(error);
    toast({
      title: `${type} upload failed`,
      description: "Your image could not be uploaded. Please try again.",
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);
    toast({
      title: `${type} upload successfully`,
      description: `${res.filePath} uploaded.`,
    });
  };

  const onValidate = (file: File) => {
    if (type === "Image") {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: "File size too large",
          description: "Please upload a file less than 20MB in size",
          variant: "destructive",
        });
        return false;
      }
    } else if (type === "Video") {
      toast({
        title: "File size too large",
        description: "Please upload a file less than 20MB in size",
        variant: "destructive",
      });
    }
    return true;
  };

  return (
    <ImageKitProvider
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
      publicKey={publicKey}
    >
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName
        validateFile={onValidate}
        onUploadProgress={({ loaded, total }) => {
          const percent = Math.round((loaded / total) * 100);
          setProgress(percent);
        }}
        folder={folder}
        accept={accept}
      />

      <button
        className={cn("upload-btn", styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src={"/icons/upload.svg"}
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className={cn("text-base", styles.placeholder)}>Upload a file</p>

        {file && <p className={cn("upload-filename")}>{file.filePath}</p>}

      </button>

      {progress > 0 && progress !== 100 && (
        <div className="w-full rounded-full bg-green-200">
          <div className="progress" style={{ width: `${progress}%` }}>
            {progress}
          </div>
        </div>
      )}

      {file && (
        (type === 'Image' ? (
          <IKImage
          alt={file.filePath!}
          path={file.filePath!}
          width={500}
          height={300}
        />
        ) : (
          <IKVideo
            path={file.filePath!}
            controls
            className="h-96 w-full rounded-xl"
          />
        )) 
      )}
    </ImageKitProvider>
  );
};

export default FileUpload;

import { useCallback, useState } from 'react';

interface useUploadFilesProps {
  accept: string;
  maxFiles: number;
}

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

export default function useUploadFiles({
  accept,
  maxFiles,
}: useUploadFilesProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const verifyAccept = ({ type, accept }: { type: string; accept: string }) => {
    const allowed = accept.split(',').map((x) => x.trim());
    return (
      allowed.includes(type) || allowed.includes(type.split('/')[0] + '/*')
    );
  };

  const verifyMaxFileSize = ({ size }: { size: number }) => {
    return size <= MAX_FILE_SIZE;
  };

  const handleDragging = useCallback(
    (ev: React.DragEvent<HTMLDivElement>) => {
      ev.preventDefault();
      setDragging(!dragging);
    },
    [setDragging]
  );

  const handleUploadFiles = useCallback(
    (filesToUpload: FileList | File[] | null) => {
      if (filesToUpload) {
        let aceptedFiles = Array.from(filesToUpload).filter(
          (file) =>
            verifyAccept({ type: file.type, accept }) &&
            verifyMaxFileSize({ size: file.size })
        );
        let updatedFilesList = [...files, ...aceptedFiles];
        updatedFilesList = updatedFilesList.slice(0, maxFiles);
        setFiles(updatedFilesList);
      }
    },
    [files, accept, verifyAccept, setFiles]
  );

  const handleDrop = useCallback(
    (ev: React.DragEvent<HTMLDivElement>) => {
      ev.preventDefault();
      handleUploadFiles(ev.dataTransfer.files);
    },
    [handleUploadFiles]
  );

  return {
    handleUploadFiles,
    handleDragging,
    handleDrop,
    setFiles,
    files,
  };
}

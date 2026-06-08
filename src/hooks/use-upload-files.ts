import { useCallback, useState } from 'react';

import type { Dictionary } from '@/lib/dictionary';

type UploadFilesErrorLabels = Dictionary['labels']['adjuntos']['errors'];

interface useUploadFilesProps {
  accept: string;
  maxFiles: number;
  errorLabels: UploadFilesErrorLabels;
}

export const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB por archivo

// Límite total. El server re-codifica los archivos a base64 (~+33% de tamaño)
// dentro del JSON enviado a la API, y el body máximo configurado es 100mb
// (ver next.config.mjs). 70MB en crudo ≈ ~93MB ya codificados, con margen.
export const MAX_TOTAL_SIZE = 70 * 1024 * 1024; // 70 MB en total

const interpolate = (
  template: string,
  vars: Record<string, string | number>
) => template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''));

export default function useUploadFiles({
  accept,
  maxFiles,
  errorLabels,
}: useUploadFilesProps) {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

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
      if (!filesToUpload) return;

      const errors: string[] = [];
      const accepted: File[] = [];

      for (const file of Array.from(filesToUpload)) {
        if (!verifyAccept({ type: file.type, accept })) {
          errors.push(
            interpolate(errorLabels.invalidType, { fileName: file.name })
          );
          continue;
        }
        if (!verifyMaxFileSize({ size: file.size })) {
          errors.push(
            interpolate(errorLabels.fileTooLarge, {
              fileName: file.name,
              maxFileSize: MAX_FILE_SIZE / 1024 / 1024,
            })
          );
          continue;
        }
        accepted.push(file);
      }

      let updatedFilesList = [...files, ...accepted];

      if (updatedFilesList.length > maxFiles) {
        errors.push(interpolate(errorLabels.tooManyFiles, { maxFiles }));
        updatedFilesList = updatedFilesList.slice(0, maxFiles);
      }

      // Descartar los últimos archivos agregados hasta entrar en el límite total.
      let totalSize = updatedFilesList.reduce((acc, f) => acc + f.size, 0);
      if (totalSize > MAX_TOTAL_SIZE) {
        while (updatedFilesList.length > 0 && totalSize > MAX_TOTAL_SIZE) {
          totalSize -= updatedFilesList.pop()!.size;
        }
        errors.push(
          interpolate(errorLabels.totalTooLarge, {
            maxTotalSize: MAX_TOTAL_SIZE / 1024 / 1024,
          })
        );
      }

      setFiles(updatedFilesList);
      setError(errors.join(' '));
    },
    [files, accept, maxFiles, errorLabels]
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
    error,
    setError,
  };
}

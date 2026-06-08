'use client';
import React, { useEffect, useRef } from 'react';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/20/solid';
import useUploadFiles, {
  MAX_FILE_SIZE,
  MAX_TOTAL_SIZE,
} from '@/hooks/use-upload-files';
import type { Dictionary } from '@/lib/dictionary';

interface UploadFilesProps {
  name: string;
  labels: Dictionary['labels']['adjuntos'];
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  error?: string;
}

export default function UploadFiles({
  name,
  labels,
  accept = 'image/*, audio/*, video/*',
  multiple = true,
  maxFiles = 3,
  error,
}: UploadFilesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainColor = 'primary';

  const {
    handleUploadFiles,
    handleDragging,
    handleDrop,
    setFiles,
    setError,
    files,
    error: filesError,
  } = useUploadFiles({
    accept,
    maxFiles,
    errorLabels: labels.errors,
  });

  const helperText = labels.helper
    .replace('{maxFiles}', String(maxFiles))
    .replace('{maxFileSize}', String(MAX_FILE_SIZE / 1024 / 1024))
    .replace('{maxTotalSize}', String(MAX_TOTAL_SIZE / 1024 / 1024));

  // El FormData del submit lee los archivos del <input> nativo, no del estado
  // del hook. Sincronizamos la lista curada (validada por tipo/tamaño y sin los
  // borrados) de vuelta al input para que se envíe exactamente eso.
  useEffect(() => {
    if (!fileInputRef.current) return;
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  }, [files]);

  const FileItem = ({ file }: { file: File }) => (
    <div
      className={`py-2 px-4 flex justify-between items-center gap-4 mt-2 rounded-md border border-${mainColor}`}
    >
      <span
        className={`text-sm text-${mainColor} text-ellipsis overflow-hidden whitespace-nowrap`}
      >
        {file.name}
      </span>
      <TrashIcon
        className='h-4 w-4 text-red-500 cursor-pointer'
        onClick={() => {
          setFiles(files?.filter((f) => f.name !== file.name));
          setError('');
        }}
      />
    </div>
  );

  return (
    <div className='flex flex-col my-5'>
      <div
        onDragEnter={handleDragging}
        onDragOver={(ev) => ev.preventDefault()}
        onDragLeave={handleDragging}
        onDragEnd={handleDragging}
        onDrop={handleDrop}
      >
        <label
          htmlFor={name}
          className={`flex flex-col items-center justify-center h-48 w-full cursor-pointer text-${mainColor} text-sm border-2 ${
            error || filesError ? 'border-red-500' : `border-${mainColor}`
          } border-dashed hover:bg-teal-50`}
        >
          <ArrowUpTrayIcon className='h-8 w-8 mb-6' />
          <span>{labels.placeholder}</span>
          <span>{helperText}</span>
          <input
            ref={fileInputRef}
            id={name}
            name={name}
            type='file'
            accept={accept}
            className='sr-only'
            onChange={(ev) => handleUploadFiles(ev.target.files)}
            multiple={multiple}
          />
        </label>
      </div>
      {(error || filesError) && (
        <p className='error text-red-500 text-sm mt-1'>{error || filesError}</p>
      )}
      {files &&
        files.length > 0 &&
        files.map((file) => <FileItem key={file.name} file={file} />)}
    </div>
  );
}

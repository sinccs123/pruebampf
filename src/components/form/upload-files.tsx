'use client';
import React, { useEffect, useRef } from 'react';
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/20/solid';
import useUploadFiles, { MAX_FILE_SIZE } from '@/hooks/use-upload-files';

interface UploadFilesProps {
  name: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  placeholder?: string;
  error?: string;
}

export default function UploadFiles({
  name,
  accept = 'image/*, audio/*, video/*',
  multiple = true,
  maxFiles = 3,
  placeholder = 'Agregar / arrastrar archivos',
  error,
}: UploadFilesProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mainColor = 'primary';

  const { handleUploadFiles, handleDragging, handleDrop, setFiles, files } =
    useUploadFiles({
      accept,
      maxFiles,
    });

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
          const fileListWithoutDeletedFile = files?.filter(
            (f) => f.name !== file.name
          );
          setFiles(fileListWithoutDeletedFile);
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
            error ? 'border-red-500' : `border-${mainColor}`
          } border-dashed hover:bg-teal-50`}
        >
          <ArrowUpTrayIcon className='h-8 w-8 mb-6' />
          <span>{placeholder}</span>
          <span>{`(máximo ${maxFiles} archivos de ${
            MAX_FILE_SIZE / 1024 / 1024
          } MB cada uno)`}</span>
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
      {error && <p className='error'>{error}</p>}
      {files &&
        files.length > 0 &&
        files.map((file) => <FileItem key={file.name} file={file} />)}
    </div>
  );
}

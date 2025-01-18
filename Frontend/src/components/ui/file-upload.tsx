import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Cloud, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onChange: (files: File[]) => void;
  value?: File[];
  className?: string;
  disabled?: boolean;
}

export function FileUpload({
  onChange,
  value,
  className,
  disabled,
}: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    disabled,
    multiple: true,
  });

  return (
    <div className={cn('w-full', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors',
          isDragActive ? 'border-primary/50 bg-primary/5' : 'border-gray-300/50',
          disabled && 'opacity-50 cursor-not-allowed',
          'hover:border-primary/50 hover:bg-primary/5'
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <Cloud className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          <p className="text-sm text-center">
            {isDragActive ? (
              'Drop the files here'
            ) : (
              <>
                Drag & drop files here, or click to select files
                <br />
                <span className="text-xs text-gray-500">
                  (Only images are allowed)
                </span>
              </>
            )}
          </p>
        </div>
      </div>

      {value && value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-2 rounded-md bg-background/50 border"
            >
              <File className="h-4 w-4 flex-shrink-0" />
              <div className="text-sm truncate flex-1">
                {file.name}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {(file.size / 1024).toFixed(1)}KB
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

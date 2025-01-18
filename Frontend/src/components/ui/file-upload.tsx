import  { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Cloud, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './button';

interface FileUploadProps {
  onChange: (files: File[]) => void;
  value?: File[];
  className?: string;
  disabled?: boolean;
  maxFiles?: number;
}

export function FileUpload({
  onChange,
  value = [],
  className,
  disabled,
  maxFiles = 6
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>(value);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
      setFiles(newFiles);
      onChange(newFiles);
    },
    [files, maxFiles, onChange]
  );

  const removeFile = (indexToRemove: number) => {
    const newFiles = files.filter((_, index) => index !== indexToRemove);
    setFiles(newFiles);
    onChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    disabled,
    maxFiles: maxFiles - files.length,
    multiple: true,
  });

  return (
    <div className={cn('w-full space-y-4', className)}>
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
                Choose files or drag & drop here
                <br />
                <span className="text-xs text-gray-500">
                  (Maximum {maxFiles} images allowed)
                </span>
              </>
            )}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={disabled || files.length >= maxFiles}
            className="mt-2"
            onClick={(e) => {
              e.stopPropagation();
              const input = document.createElement('input');
              input.type = 'file';
              input.multiple = true;
              input.accept = 'image/*';
              input.onchange = (e) => {
                const target = e.target as HTMLInputElement;
                if (target.files) {
                  const fileArray = Array.from(target.files);
                  onDrop(fileArray);
                }
              };
              input.click();
            }}
          >
            Browse Files
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group border rounded-lg p-2 bg-background/50"
            >
              <div className="aspect-square w-full relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="object-cover w-full h-full rounded-md"
                />
                <button
                  onClick={() => removeFile(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500 truncate">
                {file.name}
              </div>
              <div className="text-xs text-gray-400">
                {(file.size / 1024).toFixed(1)}KB
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

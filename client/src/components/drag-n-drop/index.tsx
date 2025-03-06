import { ReactNode } from 'react';

import { useDropzone, DropzoneOptions, DropzoneState } from 'react-dropzone';

import { cn } from 'lib/utils';

import { RxUpload } from 'react-icons/rx';

export default function DragNDrop({
  children,
  ...dropzoneOptions
}: {
  children: (state: DropzoneState) => ReactNode;
} & DropzoneOptions) {
  const state = useDropzone(dropzoneOptions);
  const { getRootProps, getInputProps, acceptedFiles } = state;

  return (
    <div
      {...getRootProps()}
      className={cn(
        'h-40 border border-dashed border-spacing-x-5 border-gray-300 rounded-lg flex items-center justify-center',
        {
          'h-auto': acceptedFiles?.length > 0,
        }
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-2">
        {!acceptedFiles?.length && (
          <>
            <div className="rounded-full  border border-grey-40 p-4">
              <RxUpload className="h-4 w-4" />
            </div>
            <span className="text-grey-20 text-center font-semibold max-w-[140px]">
              Drop file to upload or <span className="text-green-20 flex-wrap">Browse</span>
            </span>
          </>
        )}
      </div>
      {acceptedFiles?.length > 0 && children(state)}
    </div>
  );
}

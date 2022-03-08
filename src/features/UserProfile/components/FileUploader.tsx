import React, { useRef } from "react";
import { Input } from "@chakra-ui/react";

type UploaderInput = {
  accept: string;
  uploadAction: Function;
  children: React.ReactElement;
};

const FileUploader = ({ accept, uploadAction, children }: UploaderInput) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {React.cloneElement(children, { onClick: () => ref?.current?.click() })}
      <Input
        accept={accept}
        type={"file"}
        ref={ref}
        display={"none"}
        onChange={(event) => {
          const file = event.currentTarget.files?.item(0);

          if (file) {
            uploadAction(file);
          }
        }}
      />
    </>
  );
};
export default FileUploader;

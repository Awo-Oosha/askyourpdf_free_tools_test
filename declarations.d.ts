declare module "*.svg" {
    const content: any;
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default content;
  }
  declare module "*.png";
  declare module "*.webp";
  declare module "*.jpg";
  declare module "*.mp4";
  declare module "*.gif";
  declare module "get-browser-fingerprint";
  declare module "*.svg?url";
  declare module "react-copy-to-clipboard" {
    import React from "react";
  
    interface Options {
        debug: boolean;
        message: string;
    }
  
    interface Props {
        text: string;
        onCopy?(a: string, b: boolean): void;
        options?: Options;
        children?: ReactNode
    }
  
    class CopyToClipboard extends React.Component<Props, {}> {}
    export default CopyToClipboard;
  }

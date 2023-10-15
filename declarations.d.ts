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
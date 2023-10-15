import React from "react";
import { Grid } from "antd";
import CreateAPIKeyDesktop from "./CreateAPIKeyDesktop";
import CreateAPIKeyBottomSheet from "./CreateAPIKeyBottomSheet";

const { useBreakpoint } = Grid;

type modalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  keyType:String;
  onUpdate:any;
};

export default function CreateAPIKeyModal({ open, setOpen, keyType, onUpdate }: modalProps) {
  const screens = useBreakpoint();

  return screens.lg ? (
    <CreateAPIKeyDesktop onUpdate={onUpdate} open={open} setOpen={setOpen} keyType={keyType} key={Math.random()} />
  ) : (
    <CreateAPIKeyBottomSheet onUpdate={onUpdate} open={open} setOpen={setOpen} keyType={keyType} key={Math.random()}/>
  );
}

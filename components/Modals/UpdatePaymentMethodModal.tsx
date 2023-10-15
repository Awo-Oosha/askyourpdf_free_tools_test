import React from "react";
import { Grid } from "antd";
import UpdatePaymentMethodDesktop from "./UpdatePaymentMethodDesktop";
import UpdatePaymentMethodBottomSheet from "./UpdatePaymentMethodBottomSheet";

const { useBreakpoint } = Grid;

type modalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UpdatePaymentMethodModal({
  open,
  setOpen,
}: modalProps) {
  const screens = useBreakpoint();

  return screens.lg ? (
    <UpdatePaymentMethodDesktop open={open} setOpen={setOpen} />
  ) : (
    <UpdatePaymentMethodBottomSheet open={open} setOpen={setOpen} />
  );
}

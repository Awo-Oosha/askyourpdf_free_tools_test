import React from "react";
import Visa from "@/img/card_icons/visa.svg?url";
import MasterCard from "@/img/card_icons/mastercard.svg?url";
import Amex from "@/img/card_icons/amex.svg?url";
import Discover from "@/img/card_icons/discover.svg?url";
import JCB from "@/img/card_icons/jcb.svg?url";
import Diners from "@/img/card_icons/diners.svg?url";
import Unionpay from "@/img/card_icons/unionpay.svg?url";
import Generic from "@/img/card_icons/generic.svg?url";
import Image from "next/image";

interface props {
  cardBrand?: string;
  style?: React.CSSProperties;
}

const cardIconMap: { [key: string]: string } = {
  visa: Visa,
  mastercard: MasterCard,
  amex: Amex,
  discover: Discover,
  jcb: JCB,
  diners: Diners,
  unionpay: Unionpay,
};

const defaultCardIcon = Generic;

// million-ignore
export default function CardBrandIcon({ cardBrand, style }: props) {
  const iconSrc = cardIconMap[cardBrand ?? ""] || defaultCardIcon;

  return (
    <Image
      src={iconSrc}
      alt={cardBrand ?? ""}
      style={{ maxWidth: "100%", display: "block", height: "auto", ...style }}
      width={780}
      height={500}
    />
  );
}

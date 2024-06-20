import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  iconSrc: string;
  value: string;
  borderColor: string;
}

const PriceInfoCard = ({ title, iconSrc, value, borderColor }: Props) => {
  return (
    <div className={`price-info_card border-l-[${borderColor}]`}>
      <p className="text-base font-medium text-black-100">{title}</p>

      <div className="flex gap-1">
        <Image alt={title} src={iconSrc} width={24} height={24} />

        <p className="text-2xl font-bold text-secondary">{value}</p>
      </div>
    </div>
  );
};

export default PriceInfoCard;

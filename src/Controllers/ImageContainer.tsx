import React from "react";
import Image from "next/image";

interface EnhancedProductImageProps {
  ImageSource: any;
  AlternateText?: string;
  Dimensions?: { Height?: number; Width?: number };
  CustomClasses?: string;
  Layout?: "FIXED" | "INTRINSIC" | "RESPONSIVE" | "FILL";
  Priority?: boolean;
  Placeholder?: "blur" | "empty";
  BlurDataURL?: string;
}

const ProductImage: React.FC<EnhancedProductImageProps> = ({
  ImageSource,
  AlternateText = "Image",
  Dimensions = { Height: 60, Width: 60 },
  CustomClasses = "",
  Layout = "INTRINSIC",
  Priority = false,
  Placeholder = "empty",
  BlurDataURL = "",
}) => {
  const { Height, Width } = Dimensions;

  return (
    <div className={`relative ${CustomClasses}`}>
      <Image
        src={ImageSource || '/assets/one-week-new.png'}
        alt={AlternateText}
        height={Layout === "FILL" ? undefined : Height}
        width={Layout === "FILL" ? undefined : Width}
        layout={Layout.toLowerCase() as "fixed" | "intrinsic" | "responsive" | "fill"}
        priority={Priority}
        placeholder={Placeholder}
        blurDataURL={BlurDataURL}
        className="object-contain"
      />
    </div>
  );
};

export default ProductImage;

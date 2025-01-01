import { TableHeaderSetting } from "@/app/(main)/subaccount/[subaccountId]/funnels/structure";
import { Input } from "@/components/ui/input";
import ProductImage from "@/Controllers/ImageContainer";
import { BoxTypeIdentifier, InputTypes, IntervalsSettings } from "@/lib/structures";
import { TailwindBorderSizes } from "@/lib/themeConfig";
import { head } from "lodash";
import Image from "next/image";
export const getComputedBordersConfig = (size: keyof typeof TailwindBorderSizes): string => {
  return TailwindBorderSizes[size] || TailwindBorderSizes.default;
};
export const conditionalRendering = (
  typeOperator: "INPUT_ELEMENT" | "DIMENSIONAL_MEASUREMENT" | "RANGE" | "AMOUNT_VALIDATOR" | "DETAIL",
  productCart?: any[],
  handleChange?: (itemSection: any) => void,
  additionalClasses?: string,
  product?: any
) => {
  switch (typeOperator) {
    case "INPUT_ELEMENT":
      return (
        <Input defaultChecked={!!productCart?.find(
          (productOverview: { productId: any }) =>
            productOverview?.productId === product?.default_price?.id
        )}
          onChange={() => handleChange && handleChange(product)}
          type={InputTypes?.CHECKBOX}
          className={`w-4 h-4 ${additionalClasses || ""}`}
        />
      );

    case "DIMENSIONAL_MEASUREMENT":
      return (
        <ProductImage
          AlternateText={product?.name}
          Dimensions={{ Height: 60, Width: 60 }}
          ImageSource={head(product?.images)}
          Layout="RESPONSIVE"   
        />
      );

    case "RANGE":
      return product?.default_price?.recurring ? (IntervalsSettings?.RECURRING) : (IntervalsSettings?._ONE_TIME);

    case "AMOUNT_VALIDATOR":
      return (
        <BoxTypeIdentifier.Span className={`text-right ${additionalClasses || ""}`}>
          ${((product?.default_price?.unit_amount || 0) / 100).toFixed(2)}
        </BoxTypeIdentifier.Span>
      );
      case "DETAIL":
        return product?.name
    default:
      return null
  }
};

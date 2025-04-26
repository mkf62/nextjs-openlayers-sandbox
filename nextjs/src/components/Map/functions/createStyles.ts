import { theme } from "@/theme/theme";
import { Fill, Circle, Stroke, Style } from "ol/style";

export const createPointStyle = (
  fillColor: string,
  radius?: number,
  lineColor?: string,
  lineWidth?: number
): Style => {
  const s = new Style({
    image: new Circle({
      radius: radius ? radius : 4,
      fill: new Fill({ color: fillColor }),
      stroke: new Stroke({
        color: lineColor ? lineColor : theme.black,
        width: lineWidth ? lineWidth : 1,
      }),
    }),
  });
  return s;
};

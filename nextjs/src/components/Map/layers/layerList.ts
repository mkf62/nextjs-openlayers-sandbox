import { osm } from "./basemap";
import { zoo, icecream } from "./pointLayers";
import { LayerObjList } from "@/types/layerTypes";

export const layerList: LayerObjList = {
  osm: osm,
  zoo: zoo,
  icecream: icecream,
};

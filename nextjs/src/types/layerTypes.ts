import VectorTileLayer from "ol/layer/VectorTile";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import OSM from "ol/source/OSM";
import { Geometry } from "ol/geom";

interface LayerProperties {
  visible: boolean;
  layerName?: string;
}

export type LayerPropsList = {
  [layerName: string]: LayerProperties;
};

type VLyr = VectorTileLayer | VectorLayer<VectorSource<Feature<Geometry>>>;

type Layer = VLyr | TileLayer<OSM>;

export type LayerObjList = {
  [layerName: string]: Layer;
};

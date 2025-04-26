import { createSlice } from "@reduxjs/toolkit";
import { LayerPropsList } from "@/types/layerTypes";

interface MapState {
  mapLayers: LayerPropsList;
}

const initialState: MapState = {
  mapLayers: {
    osm: { visible: true },
    icecream: { visible: true, layerName: "Ice Cream Shops" },
    zoo: { visible: false, layerName: "Local Zoos" },
  },
};

export const mapSlice = createSlice({
  name: "layers",
  initialState,
  reducers: {
    addLayerToMap: (state, action) => {
      const lyrName = action.payload;
      state.mapLayers[lyrName].visible = true;
    },
    removeLayerFromMap: (state, action) => {
      const lyrName = action.payload;
      state.mapLayers[lyrName].visible = false;
    },
  },
});

export const { addLayerToMap, removeLayerFromMap } = mapSlice.actions;

export default mapSlice.reducer;

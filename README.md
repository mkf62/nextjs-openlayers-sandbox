### Stack

This project was build using this stack:

#### Frontend

-   NextJS with Pages Router and Turbopack
-   Mantine UI Component Library
-   OpenLayers
-   [React-]Redux Toolkit
-   Typescript

#### Backend

-   Flask (Python)

---

### Run the project

To run the project, follow these general steps. They assume you are using VSCode as your IDE:

1. In a terminal window, `cd nextjs && npm install` to install the JS packages.
2. Create a `launch.json` file. See `launch-json-sample.md` for more information.
3. Create a `.env.development` file. See `env.development-sample.md` for more information.
4. Create the python environment. A YAML file is available at `/flaskAPI/pyEnv.yml` for easy import with conda or mamba package managers.
5. In VSCode, go to the debug panel and select "Full Stack" in the start debugging menu to run the backend, frontend, and browser in one click.

---

### Altering the Map

The OpenLayers `Map` class object that you interact with to alter the map is located in `/nextjs/src/components/Map/MapContainer.tsx`. The `Map` class object maintains its own internal state that we do not have direct access to outside of the `MapContainer` component. Due to this limitation, Redux-Toolkit is used as a way to maintain necessary bits of the map state and communicate changes to the map from other components that cannot directly pass props to the `MapContainer`, like `LayersModal`. To demonstrate this workflow, I'll use the example of adding a new layer to the map by checking a box on the Layers modal:

1. In the `LayersModal` component, a user checks a box to add another layer the map.
2. In the `LayersModal` component, when the user checks the box a reducer function is dispatched that changes the "visible" property to "true" on a master list of the map layers (`mapLayers`) in the global state.
3. In the `MapContainer` component, a `useEffect` listens for changes to `mapLayers` in the global state.
4. In `MapContainer`, a change is detected on `mapLayers`, so it sorts which layers now have `visible: true` and which layers now have `visible: false`. It compares these lists to the internal state of the OpenLayers `Map` class object and updates the `Map` class object to turn on/off the appropriate layers.

Essentially, the goal is to sync your own bits of global state to the `Map` class object's internal state and vice-versa.

#### Why don't you just store the `Map` class object in the global state so other components can access it?

There are few reasons this is bad practice:

-   The `Map` class object, along with other OpenLayers classes such as `VectorLayer`, `VectorSource`, `VectorTileLayer`, `Feature`, etc. all contain properties that are not serializable, thus you will get numerous console warnings about it and it can cause unpredictable and difficult to debug problems in your map.
-   Many map functions heavily depend on the order of operations, such as selecting features on a layer and then filtering those selections by a certain property's value. If you are passing the `Map` class object (or other layer objects) around to different components, it becomes difficult to track what component is doing what and when.
-   You should try to keep your global state as small as possible and only include what is actually needed in it. Storing giant objects like the `Map` or numerous layer objects would create a very large state and could possibly slow down your application.

#### Isn't using a lot of useEffects bad form in React?

Generally speaking, yes, but OpenLayers was not originally written to be utilized with React. In fact, no mapping engine was written to be utilized with React until [deck.gl](https://deck.gl) came along. As such, we must work within the constraints of the library and the most correct way of doing things with OpenLayers in React is using useEffects, unless you wish to write a whole library around OpenLayers to make it more React-friendly yourself. See the [rlayers](https://github.com/mmomtchev/rlayers) project for an example of someone trying to do this.

---

### Special Notes

-   `next.config.ts` has `reactStrictMode` set to `false`. When set to `true` it causes problems with rendering OpenLayers maps. You may be able to use a [ref](https://stackoverflow.com/questions/73441404/open-layer-renders-map-component-twice-in-react) to mitigate this problem.
-   If you prefer Zustand over Redux-Toolkit, I have also successfully implemented that as my global state manager so it should be possible to alter this template to your liking with Zustand.

---

### Pull Requests

Don't bother, I won't pay attention. Feel free to fork the project and mess around to your heart's content.

import Map from "./Map";
import { Layers, TileLayer } from "./Layers";
import { osm } from "./Source";
import { fromLonLat } from "ol/proj";
import { Controls, FullScreenControl } from "./Controls";

const App = () => {

  return (
    <div>
      <Map center={fromLonLat([-94.9065, 38.9884])} zoom={9}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
        </Layers>
        <Controls>
					<FullScreenControl />
				</Controls>
      </Map>
    </div>
  );
};

export default App;

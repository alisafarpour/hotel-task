import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import HotelDetails from "./pages/HotelDetails";
import MapView from "./pages/MapView";
import Layout from "@components/Layout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/hotel/:id" element={<HotelDetails />} />
                <Route path="map" element={<MapView />} />
            </Route>
        </Routes>
    );
}

export default App;

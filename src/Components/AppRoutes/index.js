import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Candidats";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Bureau";
import Orders from "../../Pages/Centre";
import Add_Candidate from "../../Pages/Add/Add_Candidate";
import Mapp from "../../Pages/Map/Mapp"
import 'leaflet/dist/leaflet.css';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/add" element={<Add_Candidate />}></Route>
      <Route path="/map" element={<Mapp />}></Route>
    </Routes>
  );
}
export default AppRoutes;

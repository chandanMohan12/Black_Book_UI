import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import StandardEquipmentList from "./Component/StandardEquipmentList/StandardEquipmentList";
import DataComparison from "./Component/DataComparison/DataComparison";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<StandardEquipmentList />} />
        <Route path="/comparison" element={<DataComparison />} />
      </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;

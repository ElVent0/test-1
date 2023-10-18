import Filter from "./Filter.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route index element={<Filter />} />
    </Routes>
  );
};

export default App;

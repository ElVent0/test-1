import Filter from "../components/Filter/Filter";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Filter />}></Route>
    </Routes>
  );
};

export default App;

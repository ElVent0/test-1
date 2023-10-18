import Container from "./Container.jsx";
import Filter from "./Filter.jsx";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<Filter />} />
      </Route>
    </Routes>
  );
};

export default App;

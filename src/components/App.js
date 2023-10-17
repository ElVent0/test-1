import Container from "../components/Container/Container";
import Filter from "../components/Filter/Filter";
import DragAndDrop from "../components/DragAndDrop/DragAndDrop";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Container />}>
        <Route index element={<Filter />} />
        <Route path="/dnd" element={<DragAndDrop />} />
      </Route>
    </Routes>
  );
};

export default App;

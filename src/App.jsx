import "./catogories-styles.scss";
import HomeComponent from "./routes/home/HomeComponent.jsx";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/Navigation.jsx";

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomeComponent />} />
        <Route path="shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;

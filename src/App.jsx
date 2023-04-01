import "./catogories-styles.scss";
import HomeComponent from "./routes/home/HomeComponent.jsx";
import { Routes, Route, Outlet } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <div>
        <h2>I am the navigation bar</h2>
      </div>
      <Outlet />
    </div>
  );
};

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

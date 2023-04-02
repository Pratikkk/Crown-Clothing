import {useContext} from 'react';
import { UserContext } from './contexts/UserContext';
import HomeComponent from './routes/home/HomeComponent.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './routes/navigation/Navigation.jsx';
import Authentication from './routes/authentication/Authentication.jsx';
import './catogories-styles.scss';

const Shop = () => {
  return <h1>I am the shop page</h1>;
};

function App() {
  const {currentUser} = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<HomeComponent />} />
        <Route path="shop" element={<Shop />} />
        <Route
          path="auth"
          element={
            currentUser ? <Navigate to="/" replace /> : <Authentication />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

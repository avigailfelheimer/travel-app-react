import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/userContext';

import PublicRoute    from './components/common/PublicRoute';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login          from './pages/auth/Login';
import Register       from './pages/auth/Register';

// TODO: import PlaceList     from './pages/places/PlaceList';
// TODO: import PlaceDetail   from './pages/places/PlaceDetail';
// TODO: import PlaceForm     from './pages/places/PlaceForm';
// TODO: import Itinerary     from './pages/itinerary/Itinerary';

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/places" replace />} />

        {/* Public-only routes — redirect away if already logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Open browsing routes */}
        {/* <Route path="/places"      element={<PlaceList />} /> */}
        {/* <Route path="/places/:id"  element={<PlaceDetail />} /> */}

        {/* Protected routes — require authentication */}
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/places/new"      element={<PlaceForm />} /> */}
          {/* <Route path="/places/:id/edit" element={<PlaceForm />} /> */}
          {/* <Route path="/itinerary"       element={<Itinerary />} /> */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/places" replace />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

// import './App.css';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { UserProvider } from './context/userContext';

// import PublicRoute    from './components/common/PublicRoute';
// import ProtectedRoute from './components/common/ProtectedRoute';
// import Layout         from './components/common/Layout';

// import Login          from './pages/auth/Login';
// import Register       from './pages/auth/Register';
// import Home           from './pages/Home';
// import PlaceList      from './pages/places/PlaceList';
// import PlaceDetail    from './pages/places/PlaceDetail';
// import Gallery        from './pages/Gallery';
// import Profile        from './pages/Profile';
// import ProfileEdit    from './pages/ProfileEdit';
// import Itinerary      from './pages/Itinerary';

// function App() {
//   return (
//     <UserProvider>
//       <Routes>
//         {/* Default redirect */}
//         <Route path="/" element={<Navigate to="/places" replace />} />

//         {/* Public-only routes — redirect away if already logged in */}
//         <Route element={<PublicRoute />}>
//           <Route path="/login"    element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Route>

//        <Route element={<Layout />}>
//           {/* Public pages */}
//           <Route path="/home"     element={<Home />} />
//           <Route path="/places"   element={<PlaceList />} />
//           <Route path="/places/:id" element={<PlaceDetail />} />
//           <Route path="/gallery"  element={<Gallery />} />

//         <Route path="/places"     element={<PlaceList />} />
//         <Route path="/places/:id" element={<PlaceDetail />} />
//         </Route>

//         {/* Protected routes — require authentication */}
//         <Route element={<ProtectedRoute />}>
//           {/* <Route path="/places/new"      element={<PlaceForm />} /> */}
//           {/* <Route path="/places/:id/edit" element={<PlaceForm />} /> */}
//           {/* <Route path="/itinerary"       element={<Itinerary />} /> */}
//         </Route>

//         {/* Fallback */}
//         <Route path="*" element={<Navigate to="/places" replace />} />
//       </Routes>
//     </UserProvider>
//   );
// }

// export default App;

import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/userContext';

import PublicRoute    from './components/common/PublicRoute';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout         from './components/common/Layout';

import Login          from './pages/auth/Login';
import Register       from './pages/auth/Register';
import Home           from './pages/Home';
import PlaceList      from './pages/places/PlaceList';
import PlaceDetail    from './pages/places/PlaceDetail';
import Gallery        from './pages/Gallery';
import GalleryPost    from './pages/GalleryPost';
import Profile        from './pages/Profile';
import ProfileEdit    from './pages/ProfileEdit';
import Itinerary      from './pages/Itinerary';

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* Auth routes (no navbar) */}
        <Route element={<PublicRoute />}>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Main app with Navbar on all these pages */}
        <Route element={<Layout />}>
          {/* Public pages */}
          <Route path="/home"     element={<Home />} />
          <Route path="/places"   element={<PlaceList />} />
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/gallery"  element={<Gallery />} />
          <Route path="/gallery/:placeId/:mediaId" element={<GalleryPost />} />

          {/* Protected pages */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile"       element={<Profile />} />
            <Route path="/profile/edit"  element={<ProfileEdit />} />
            <Route path="/itinerary"     element={<Itinerary />} />
          </Route>
        </Route>

        {/* Default redirect to nice home page */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

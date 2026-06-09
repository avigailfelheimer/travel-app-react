import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './context/userContext';




function App() {

  return (
    <UserProvider>
      <Routes>

        {/* כניסה ראשונית – תמיד לוגין */}
        <Route path="/" element={<Navigate to="/place" replace />} />

        {/* דפים פתוחים */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* דפים מוגנים */}
        <Route element={<ProtectedRoute />}>
          <Route path="/users/:userId/home" element={<Home />}>
            <Route path="todos" element={<Todos />} />
            <Route path="posts" element={<Posts />}>
              <Route path=":postId" element={<ExpandedPost />} />
            </Route>
          </Route>
        </Route>

      </Routes>
    </UserProvider>
  )
}

export default App

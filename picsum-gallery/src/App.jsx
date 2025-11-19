import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PhotoListPage from "./pages/PhotoListPage";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/photos" element={<PhotoListPage />} />
        <Route path="/photos/:id" element={<PhotoDetailPage />} />
        <Route path="/" element={<Navigate replace to="/photos" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;

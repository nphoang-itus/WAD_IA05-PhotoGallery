import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import PhotoListPage from './pages/PhotoListPage';
import PhotoDetailPage from './pages/PhotoDetailPage';

function App() {
  return (
    <Routes>
      {/* Yêu cầu: Trang danh sách tại /photos  */}
      <Route path="/photos" element={<PhotoListPage />} />

      {/* Yêu cầu: Trang chi tiết tại /photos/:id  */}
      <Route path="/photos/:id" element={<PhotoDetailPage />} />

      {/* (Nên có) Tự động chuyển hướng từ trang chủ "/" đến "/photos" */}
      <Route path="/" element={<Navigate replace to="/photos" />} />
    </Routes>
  );
}

export default App;
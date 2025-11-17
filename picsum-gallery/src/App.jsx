import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import PhotoListPage from "./pages/PhotoListPage";
import PhotoDetailPage from "./pages/PhotoDetailPage";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

function App() {
  return (
    <Box>
      <AppBar position="static">
        {/* 'static' sẽ đẩy nội dung xuống dưới */}
        <Toolbar>
          <PhotoCameraIcon sx={{ mr: 2 }} /> {/* Thêm icon */}
          <Typography variant="h6" component="div">
            Picsum Gallery
          </Typography>
        </Toolbar>
      </AppBar>

      <Routes>
        {/* Yêu cầu: Trang danh sách tại /photos  */}
        <Route path="/photos" element={<PhotoListPage />} />

        {/* Yêu cầu: Trang chi tiết tại /photos/:id  */}
        <Route path="/photos/:id" element={<PhotoDetailPage />} />

        {/* (Nên có) Tự động chuyển hướng từ trang chủ "/" đến "/photos" */}
        <Route path="/" element={<Navigate replace to="/photos" />} />
      </Routes>
    </Box>
  );
}

export default App;

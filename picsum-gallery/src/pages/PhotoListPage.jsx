import React from "react";
import { Container, Typography, Box } from "@mui/material";

const PhotoListPage = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Đây là Trang Danh sách Ảnh
        </Typography>
        <Typography>
          (Sử dụng MUI Grid và Cardcor 'để hiển thị ảnh ở đây)
        </Typography>
      </Box>
    </Container>
  );
};

export default PhotoListPage;
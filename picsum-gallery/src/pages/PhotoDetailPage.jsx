import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const PhotoDetailPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Đây là Trang Chi tiết Ảnh
        </Typography>
        <Typography>
          (Hiển thị ảnh full-size và thông tin chi tiết ở đây)
        </Typography>
      </Box>
    </Container>
  );
};

export default PhotoDetailPage;
import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Container, Typography, Grid, Alert, useStepContext } from "@mui/material";
import PhotoCard from "../components/PhotoCard";
import Loader from "../components/Loader";

const PhotoListPage = () => {
  // State để lưu danh sách ảnh
  const [photos, setPhotos] = useState([]);
  // State để quản lý trạng thái tải
  const [loading, setLoading] = useState(false);
  // State để quản lý lỗi
  const [error, setError] = useState(null);
  // State để theo dõi trang hiện tại (cho bước Infinite Scroll sau này)
  const [page, setPage] = useState(1)

  // Dùng useEffect để gọi API khi component được tải lần đầu
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true); // Bat dau tai
      setError(null); // Xoa loi cu

      try {
        // Goi API cua Picsum de lay danh sach: Lay 20 anh cho trang 1
        const response = await axios.get(
          `https://picsum.photos/v2/list?page=${page}&limit=20`
        );

        setPhotos(response.data);
      } catch (err) {
        // Xu ly loi khi call api fail
        console.error(err);
      } finally {
        // Dung tai (du fail hay success)
        setLoading(false)
      }
    };

    fetchPhotos(); // Goi ham fetch
  },
  [page] // chi chay lai khi 'page' thay doi (hien chi chay 1 lan)
);
  
  // -- render content --
  // neu co loi, hien thi thong bao loi
  if (error && photos.length === 0) {
    return (
      <Container
        maxWidth='md'
        sx={{
          py: 4
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container
      maxWidth='lg'
      sx={{
        py: 4
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
      >
        Thư viện ảnh Picsum
      </Typography>
      <Grid container spacing={3}>
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo}/>
        ))}
      </Grid>
      
      {/* Hiển thị loader nếu đang tải  */}
      {loading && <Loader/>}
    </Container>
  );
};

export default PhotoListPage;
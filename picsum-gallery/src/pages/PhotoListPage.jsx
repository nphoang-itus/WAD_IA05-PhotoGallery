import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Grid,
  Alert,
  useStepContext,
} from "@mui/material";
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
  const [page, setPage] = useState(1);

  // State theo doi xem con anh de tai ko
  const [hasMore, setHasMore] = useState(true);

  // Ref cho Intersection Observer
  const observer = useRef();

  // Callback ref gan cho the trigger o cuoi danh sach
  // useCallBack dung de React nho ham nay, tranh viec tao lai
  const lastPhotoElementRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      // Ngat ket noi observer cu (neu co)
      if (observer.current) {
        observer.current.disconnect();
      }

      // Khoi tao observer moi
      observer.current = new IntersectionObserver((entries) => {
        // Khi the trigger (node) xuat hien tren man hinh (isIntersecting)
        // Va chung ta van con anh de tai (hasMore)
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      // Neu the trigger (node) ton tai, hay theo doi no
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore] // phu thuoc vao loading va hasmore
  );

  const fetchPhotos = useCallback(async () => {
    setLoading(true); // Bat dau tai
    setError(null); // Xoa loi cu

    try {
      // Goi API cua Picsum de lay danh sach: Lay 20 anh cho trang 1
      const response = await axios.get(
        `https://picsum.photos/v2/list?page=${page}&limit=20`
      );

      if (response.data.length === 0) {
        // Neu API tra ve mang rong, tuc la het anh
        setHasMore(false);
      } else {
        // Noi anh moi vao anh cu
        setPhotos((prevPhotos) => [...prevPhotos, ...response.data]);
      }
    } catch (err) {
      // Xu ly loi khi call api fail
      console.error(err);
    } finally {
      // Dung tai (du fail hay success)
      setLoading(false);
    }
  }, [page]); // Hàm này sẽ được tạo lại khi 'page' thay đổi

  // useEffect này giờ chỉ gọi hàm fetchPhotos
  useEffect(
    () => {
      fetchPhotos(); // Goi ham fetch
    },
    [fetchPhotos] // Phụ thuộc vào 'fetchPhotos' (mà 'fetchPhotos' lại phụ thuộc vào 'page')
  );

  // -- render content --
  // neu co loi, hien thi thong bao loi
  if (error && photos.length === 0) {
    return (
      <Container
        maxWidth="md"
        sx={{
          py: 4,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
      }}
    >
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Thư viện ảnh Picsum
      </Typography>
      <Grid container spacing={3}>
        {photos.map((photo, index) => (
          <PhotoCard key={index} photo={photo} />
        ))}
      </Grid>
      {/* Gan ref vao trigger  */}
      <div ref={lastPhotoElementRef} />

      {/* Chi bao tai se hien thi o cuoi danh sach */}
      {loading && <Loader />}

      {/* Hien thi thong bao khi da het anh */}
      <Typography align="center" sx={{ mt: 4, color: "text.secondary" }}>
        Bạn đã xem hết ảnh.
      </Typography>
    </Container>
  );
};

export default PhotoListPage;

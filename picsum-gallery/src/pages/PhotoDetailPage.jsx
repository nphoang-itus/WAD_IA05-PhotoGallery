import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Alert,
  Button,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Icon mũi tên

const PhotoDetailPage = () => {
  const { id } = useParams();

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      setLoading(false);
      setError(null);

      try {
        const response = await axios.get(`https://picsum.photos/id/${id}/info`);

        setPhoto(response.data);
      } catch (err) {
        setError("Không thể tải thông tin ảnh.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotoDetails();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          py: 4,
        }}
      >
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!photo) {
    return null;
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
      }}
    >
      <Button
        component={Link}
        to="/photos"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 3,
        }}
      >
        Quay lại danh sách
      </Button>

      <Paper elevation={3}>
        <Box
          component="img"
          src={photo.download_url}
          alt={photo.author}
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "4px 4px 0 0",
          }}
        />

        <Box
          sx={{
            p: 3,
          }}
        >
          {/* Yêu cầu: Tiêu đề (dùng placeholder vì API không có) */}
          <Typography variant="h4" component="h1" gutterBottom>
            Một tác phẩm tuyệt vời
          </Typography>

          {/* Yêu cầu: Tên tác giả */}
          <Typography variant="h6" component="p" color="text.secondary">
            Tác giả: {photo.author}
          </Typography>

          {/* Yêu cầu: Mô tả (dùng placeholder) */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            Đây là mô tả placeholder cho bức ảnh. API của Lorem Picsum không
            cung cấp mô tả, vì vậy chúng ta sẽ hiển thị nội dung này để đáp ứng
            yêu cầu của bài tập.
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            (Kích thước gốc: {photo.width} x {photo.height})
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PhotoDetailPage;

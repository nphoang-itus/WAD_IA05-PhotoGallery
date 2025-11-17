import { Container, Typography, Box, Alert, Button, Paper } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loader from "../components/Loader";
import usePhotoDetail from "../hooks/usePhotoDetail";

const PhotoDetailPage = () => {
  const { id } = useParams();
  const { photo, loading, error } = usePhotoDetail(id);

  if (loading) {
    return <Loader message="Đang tải thông tin ảnh..." fullHeight />;
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button
          component={RouterLink}
          to="/photos"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
        >
          Quay lại danh sách
        </Button>
      </Container>
    );
  }

  if (!photo) {
    return null;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={RouterLink}
        to="/photos"
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
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
          loading="lazy"
        />

        <Box sx={{ p: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Một tác phẩm tuyệt vời
          </Typography>

          <Typography variant="h6" component="p" color="text.secondary">
            Tác giả: {photo.author}
          </Typography>

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

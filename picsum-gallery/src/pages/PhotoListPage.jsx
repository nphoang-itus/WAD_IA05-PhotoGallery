import { Container, Typography, Grid, Alert } from "@mui/material";
import PhotoCard from "../components/PhotoCard";
import Loader from "../components/Loader";
import usePhotoList from "../hooks/usePhotoList";

const PhotoListPage = () => {
  const { photos, loading, error, hasMore, lastPhotoRef } = usePhotoList();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Thư viện ảnh Picsum
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {photos.map((photo, index) => {
          const isLastItem = index === photos.length - 1;
          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              ref={isLastItem ? lastPhotoRef : null}
            />
          );
        })}
      </Grid>

      {loading && <Loader message="Đang tải thêm ảnh..." />}

      {!hasMore && photos.length > 0 && (
        <Typography align="center" sx={{ mt: 4, color: "text.secondary" }}>
          Bạn đã xem hết ảnh.
        </Typography>
      )}
    </Container>
  );
};

export default PhotoListPage;

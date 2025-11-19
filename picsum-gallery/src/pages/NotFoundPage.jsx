import { Container, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <Container
    maxWidth="sm"
    sx={{
      py: 8,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
    }}
  >
    <Typography
      variant="h2"
      component="h1"
      color="error" // Màu đỏ nổi bật
      sx={{
        fontWeight: "bold", // Tăng độ đậm
        textTransform: "uppercase", // Viết hoa toàn bộ
      }}
    >
      404 Not Found
    </Typography>
    <Stack spacing={2}>
      <Typography variant="h5" component="p">
        Không tìm thấy trang bạn yêu cầu.
      </Typography>
      <Typography color="text.secondary">
        Đường dẫn có thể đã bị thay đổi hoặc không tồn tại. Vui lòng kiểm tra
        lại hoặc quay trở về trang danh sách ảnh.
      </Typography>
    </Stack>
    <Button
      variant="contained"
      size="large"
      component={Link}
      to="/photos"
      sx={{ mt: 2 }}
    >
      Về trang chủ
    </Button>
  </Container>
);

export default NotFoundPage;


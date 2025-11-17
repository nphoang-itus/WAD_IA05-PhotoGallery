import React from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PhotoCard = ({ photo }) => {
  return (
    <Grid
      sx={{
        gridColumn: {
          xs: "span 12", // Chiếm toàn bộ cột trên màn hình nhỏ
          sm: "span 6", // Chiếm 6 cột trên màn hình nhỏ
          md: "span 4", // Chiếm 4 cột trên màn hình trung bình
          lg: "span 3", // Chiếm 3 cột trên màn hình lớn
        },
      }}
    >
      <Card
        sx={{
          height: "100%",
          textDecoration: "none",
        }}
        component={Link}
        to={`/photos/${photo.id}`}
      >
        <CardMedia
          component="img"
          height="200"
          image={photo.download_url}
          alt={photo.author}
        />
        <CardContent>
          <Typography variant="h6" component="div" noWrap>
            {photo.author}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PhotoCard;
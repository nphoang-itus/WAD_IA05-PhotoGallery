import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const PhotoCard = forwardRef(({ photo }, ref) => (
  <Grid item xs={12} sm={6} md={4} lg={3} ref={ref}>
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
        loading="lazy"
      />
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {photo.author}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
));

PhotoCard.displayName = "PhotoCard";

PhotoCard.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    download_url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
};

export default PhotoCard;
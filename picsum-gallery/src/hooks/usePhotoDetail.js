import { useEffect, useState } from "react";
import { fetchPhotoDetails } from "../services/picsumApi";

/**
 * Fetches the detailed information for a single photo based on its id.
 */
const usePhotoDetail = (id) => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadPhoto = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await fetchPhotoDetails(id);

        if (isMounted) {
          setPhoto(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Không thể tải thông tin ảnh.");
        }
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPhoto();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { photo, loading, error };
};

export default usePhotoDetail;


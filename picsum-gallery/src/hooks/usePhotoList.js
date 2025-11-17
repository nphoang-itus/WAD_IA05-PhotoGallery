import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPhotoList } from "../services/picsumApi";

const PHOTOS_PER_PAGE = 20;

/**
 * Encapsulates the logic for fetching and paginating the photo list.
 * This keeps the page component lean and easier to test.
 */
const usePhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef(null);

  const loadPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await fetchPhotoList({
        page,
        limit: PHOTOS_PER_PAGE,
      });

      if (!data || data.length === 0) {
        setHasMore(false);
        return;
      }

      setPhotos((prev) => [...prev, ...data]);
    } catch (err) {
      setError("Không thể tải danh sách ảnh.");
      setHasMore(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  const lastPhotoRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return {
    photos,
    loading,
    error,
    hasMore,
    lastPhotoRef,
  };
};

export default usePhotoList;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPlaces } from '../API/placeAPI';
import '../styles/gallery.css';

const BASE_URL = 'http://localhost:3000';

export default function Gallery() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      try {
        const placesRes = await getPlaces({ page: 1, limit: 12 });
        const places = placesRes.places || [];

        const allMedia = [];
        await Promise.all(
          places.map(async (p) => {
            try {
              const res = await fetch(`${BASE_URL}/places/${p.place_id}/media`);
              if (!res.ok) return;
              const items = await res.json();
              items.forEach((it) => allMedia.push({ ...it, placeId: p.place_id }));
            } catch (e) {
              // ignore single place failures
            }
          })
        );

        setMedia(allMedia);
      } catch (err) {
        setMedia([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <div className="gallery-page">
      <h1 className="gallery-title">גלריית תמונות</h1>

      {loading ? (
        <div className="gallery-loading">טוען תמונות...</div>
      ) : media.length === 0 ? (
        <div className="gallery-empty">לא נמצאו תמונות.</div>
      ) : (
        <div className="gallery-grid">
          {media.map((m) => (
            <Link
              to={`/gallery/${m.placeId}/${m.id}`}
              className="gallery-item"
              key={`${m.placeId}-${m.id}`}>
              <img src={m.url} alt={m.caption || 'תמונה'} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000';

export default function GalleryPost() {
  const { placeId, mediaId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/places/${placeId}/media`);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const list = await res.json();
        const found = list.find((i) => String(i.id) === String(mediaId));
        setItem(found || null);
      } catch (e) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [placeId, mediaId]);

  if (loading) return <div style={{padding:20}}>טוען...</div>;
  if (!item) return <div style={{padding:20}}>הפוסט לא נמצא. <Link to="/gallery">חזרה לגלריה</Link></div>;

  return (
    <div style={{padding:20, maxWidth:900, margin:'0 auto', textAlign:'right'}}>
      <h2>{item.caption || 'תמונה'}</h2>
      <img src={item.url} alt={item.caption || 'תמונה'} style={{width:'100%', borderRadius:8}} />
      <p style={{marginTop:12}}>נשלחה על ידי: {item.username || 'לא ידוע'}</p>
      <Link to={`/places/${placeId}`}>מעבר לעמוד המקום</Link>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaceById } from '../../API/placeAPI';
import '../../styles/places.css';

const DAY_LABELS = {
  sun: 'ראשון',
  mon: 'שני',
  tue: 'שלישי',
  wed: 'רביעי',
  thu: 'חמישי',
  fri: 'שישי',
  sat: 'שבת',
};

const DAY_ORDER = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const PLACE_EMOJIS = ['🏖️', '⛰️', '🌆', '🏛️', '🌿', '🍃', '🗺️', '🌅', '🏕️', '🌊'];

export default function PlaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlace = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getPlaceById(id);
        setPlace(data);
      } catch {
        setError('לא ניתן לטעון את המקום. אנא נסו שוב.');
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  if (loading) {
    return (
      <div className="places-page">
        <div className="places-loading">
          <div className="places-spinner" />
          <span>טוען מידע...</span>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="places-page">
        <div className="places-error">{error || 'המקום לא נמצא.'}</div>
      </div>
    );
  }

  const {
    name,
    description,
    categories = [],
    opening_hours,
    created_by_username,
    created_at,
  } = place;

  const emojiIdx = name ? name.charCodeAt(0) % PLACE_EMOJIS.length : 0;
  const placeEmoji = PLACE_EMOJIS[emojiIdx];
  const createdDate = formatDate(created_at);
  const hasHours = opening_hours && typeof opening_hours === 'object' && Object.keys(opening_hours).length > 0;

  return (
    <div className="place-detail-page">
      <button className="place-detail-back" onClick={() => navigate('/places')}>
        חזרה לרשימה
      </button>

      <section className="place-detail-shell">
        <div className="place-detail-hero">
          <div className="place-detail-hero-placeholder">{placeEmoji}</div>
        </div>

        <div className="place-detail-content">
          {categories.length > 0 && (
            <div className="place-detail-categories">
              {categories.map((cat) => (
                <span key={cat} className="category-tag">{cat}</span>
              ))}
            </div>
          )}

          <h1 className="place-detail-title">{name}</h1>

          {(created_by_username || createdDate) && (
            <div className="place-detail-meta">
              {created_by_username && (
                <span className="meta-item">נוצר על ידי {created_by_username}</span>
              )}
              {createdDate && <span className="meta-item">{createdDate}</span>}
            </div>
          )}

          {description && <p className="place-detail-desc">{description}</p>}

          {hasHours && (
            <div className="place-detail-hours">
              <p className="section-label">שעות פתיחה</p>
              <div className="hours-grid">
                {DAY_ORDER.map((day) => {
                  const val = opening_hours[day];
                  if (!val) return null;
                  const isClosed = val === 'closed';
                  return (
                    <div key={day} className="hours-row">
                      <span className="hours-day">{DAY_LABELS[day] ?? day}</span>
                      {isClosed
                        ? <span className="hours-closed">סגור</span>
                        : <span>{val}</span>
                      }
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="place-detail-reviews">
            <p className="section-label">תגובות</p>
            <div className="reviews-coming-soon">
              <p>תגובות יתווספו בקרוב.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return new Intl.DateTimeFormat('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

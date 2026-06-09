import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext.jsx';
import { loginUser } from '../../API/usersAPI';
import '../../styles/auth.css';

export default function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const { user, token } = await loginUser(formData.email, formData.password);
      login({ ...user, token });
      navigate('/places');
    } catch (err) {
      setError(err.message || 'שגיאה בהתחברות, נסי שנית');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">✈️</div>
          <h1 className="auth-title">ברוכות הבאות</h1>
          <p className="auth-subtitle">התחברי כדי להמשיך את המסע שלך</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <div className="form-field">
            <label htmlFor="email">אימייל</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">סיסמה</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="הזיני סיסמה"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? <span className="btn-spinner" /> : 'התחברי'}
          </button>
        </form>

        <p className="auth-switch">
          עוד אין חשבון?{' '}
          <Link to="/register">הרשמי כאן</Link>
        </p>
      </div>
    </div>
  );
}

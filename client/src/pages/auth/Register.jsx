import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext.jsx';
import { registerUser } from '../../API/usersAPI';
import '../../styles/auth.css';

export default function Register() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.userName.trim())
      newErrors.userName = 'שם משתמש הוא שדה חובה';
    if (!formData.email.trim())
      newErrors.email = 'אימייל הוא שדה חובה';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'כתובת האימייל אינה תקינה';
    if (!formData.password)
      newErrors.password = 'סיסמה היא שדה חובה';
    else if (formData.password.length < 6)
      newErrors.password = 'סיסמה חייבת להכיל לפחות 6 תווים';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'הסיסמאות אינן תואמות';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    try {
      const { user, token } = await registerUser(
        formData.userName,
        formData.email,
        formData.password,
      );
      login({ ...user, token });
      navigate('/places');
    } catch (err) {
      setErrors({ server: err.message || 'שגיאה בהרשמה, נסי שנית' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🗺️</div>
          <h1 className="auth-title">צרי חשבון חדש</h1>
          <p className="auth-subtitle">הצטרפי ותתחילי לגלות מקומות חדשים</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {errors.server && (
            <div className="auth-error" role="alert">
              {errors.server}
            </div>
          )}

          <div className="form-field">
            <label htmlFor="userName">שם משתמש</label>
            <input
              id="userName"
              name="userName"
              type="text"
              autoComplete="username"
              placeholder="השם שלך"
              value={formData.userName}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={errors.userName ? 'input-error' : ''}
              aria-describedby={errors.userName ? 'userName-error' : undefined}
            />
            {errors.userName && (
              <span id="userName-error" className="field-error">{errors.userName}</span>
            )}
          </div>

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
              className={errors.email ? 'input-error' : ''}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <span id="email-error" className="field-error">{errors.email}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="password">סיסמה</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="לפחות 6 תווים"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={errors.password ? 'input-error' : ''}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <span id="password-error" className="field-error">{errors.password}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="confirmPassword">אימות סיסמה</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="הזיני שוב את הסיסמה"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={errors.confirmPassword ? 'input-error' : ''}
              aria-describedby={errors.confirmPassword ? 'confirm-error' : undefined}
            />
            {errors.confirmPassword && (
              <span id="confirm-error" className="field-error">{errors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? <span className="btn-spinner" /> : 'הרשמי'}
          </button>
        </form>

        <p className="auth-switch">
          כבר יש לך חשבון?{' '}
          <Link to="/login">התחברי כאן</Link>
        </p>
      </div>
    </div>
  );
}

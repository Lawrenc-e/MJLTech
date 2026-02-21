import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { isEmail, minLength } from '../utils/validators';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!isEmail(form.email)) nextErrors.email = 'Enter a valid email.';
    if (!minLength(form.password, 6))
      nextErrors.password = 'Password must be at least 6 characters.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmitError('');
    const result = await login(form);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="card p-8">
      <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
      <p className="mt-2 text-sm text-slate-600">
        Sign in to access your MJLTechs workspace.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          error={errors.email}
          placeholder="you@company.com"
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={handleChange('password')}
          error={errors.password}
          placeholder="********"
        />
        {submitError && (
          <p className="text-sm text-rose-600">{submitError}</p>
        )}
        <Button type="submit" size="lg" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-500">
        New to MJLTechs?{' '}
        <Link to="/register" className="font-semibold text-brand-700">
          Create an account
        </Link>
      </p>
    </div>
  );
}
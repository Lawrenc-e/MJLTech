import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import { isEmail, isRequired, minLength } from '../utils/validators';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  name: '',
  email: '',
  company: '',
  role: 'client',
  password: ''
};

export default function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!isRequired(form.name)) nextErrors.name = 'Name is required.';
    if (!isEmail(form.email)) nextErrors.email = 'Enter a valid email.';
    if (!minLength(form.password, 6))
      nextErrors.password = 'Password must be at least 6 characters.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmitError('');
    const result = await register(form);
    if (!result.success) {
      setSubmitError(result.error);
      return;
    }
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="card p-8">
      <h2 className="text-2xl font-semibold text-slate-900">
        Create your workspace
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Start managing software delivery with MJLTechs.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <Input
          label="Full name"
          value={form.name}
          onChange={handleChange('name')}
          error={errors.name}
          placeholder="Jane Doe"
        />
        <Input
          label="Work email"
          type="email"
          value={form.email}
          onChange={handleChange('email')}
          error={errors.email}
          placeholder="jane@company.com"
        />
        <Input
          label="Company"
          value={form.company}
          onChange={handleChange('company')}
          placeholder="Company name"
        />
        <Input
          label="Role"
          as="select"
          value={form.role}
          onChange={handleChange('role')}
        >
          <option value="client">Client</option>
          <option value="developer">Developer</option>
          <option value="admin">Administrator</option>
        </Input>
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
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-500">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-brand-700">
          Sign in
        </Link>
      </p>
    </div>
  );
}
import { useState } from 'react';
import SectionHeader from '../components/SectionHeader';
import Input from '../components/Input';
import Button from '../components/Button';
import { isEmail, isRequired } from '../utils/validators';

const initialForm = {
  name: '',
  email: '',
  company: '',
  message: ''
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!isRequired(form.name)) nextErrors.name = 'Name is required.';
    if (!isEmail(form.email)) nextErrors.email = 'Enter a valid email.';
    if (!isRequired(form.message))
      nextErrors.message = 'Message is required.';
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <div className="app-container section-pad">
      <SectionHeader
        eyebrow="Contact"
        title="Let's build your next project together"
        subtitle="Tell us about your goals and we'll shape a delivery plan."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="card p-6 space-y-5">
          <Input
            label="Full name"
            value={form.name}
            onChange={handleChange('name')}
            error={errors.name}
            placeholder="Jane Doe"
          />
          <Input
            label="Work email"
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
            label="Project details"
            as="textarea"
            rows={5}
            value={form.message}
            onChange={handleChange('message')}
            error={errors.message}
            placeholder="Describe your goals, timeline, and current workflow."
          />
          <Button type="submit" size="lg">
            Send message
          </Button>
          {submitted && (
            <p className="text-sm text-emerald-600">
              Thanks! We'll respond within one business day.
            </p>
          )}
        </form>
        <div className="card-muted p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            What happens next
          </h3>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm text-slate-600">
            <li>A discovery lead reviews your request.</li>
            <li>We align on scope, timeline, and success metrics.</li>
            <li>Your delivery squad is assigned and onboarded.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
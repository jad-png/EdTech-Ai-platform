import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/Card";
import { Input } from "../../../shared/components/ui/Input";

export function RegisterPage() {
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await register(form);
      navigate("/app", { replace: true });
    } catch {
      setError("Unable to register. Check the details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main className="auth-page">
      <svg className="auth-decoration" viewBox="0 0 500 420" aria-hidden="true">
        <defs>
          <linearGradient
            id="auth-gradient-register"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#auth-gradient-register)"
          d="M80 330C5 260 55 135 145 74C237 12 375 34 429 126C480 214 424 335 323 376C226 415 135 382 80 330Z"
        />
      </svg>
      <Card className="auth-card">
        <div className="auth-card__brand">
          <span className="brand__mark" aria-hidden="true">
            ✦
          </span>
          <span className="brand__text">
            EdTech <span>AI</span>
          </span>
        </div>
        <p className="auth-card__eyebrow">AI-powered learning workspace</p>
        <h1 className="auth-card__title">Create your account</h1>
        <p className="auth-card__subtitle">
          Start building a more focused learning habit.
        </p>
        <form className="auth-form" onSubmit={submit}>
          <Input
            label="Username"
            value={form.username}
            onChange={(event) =>
              setForm({ ...form, username: event.target.value })
            }
            autoComplete="username"
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(event) =>
              setForm({ ...form, password: event.target.value })
            }
            autoComplete="new-password"
            required
          />
          <Input
            label="Confirm password"
            type="password"
            value={form.password2}
            onChange={(event) =>
              setForm({ ...form, password2: event.target.value })
            }
            autoComplete="new-password"
            required
          />
          {error && (
            <p className="form-error" role="alert" aria-live="polite">
              {error}
            </p>
          )}
          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </Button>
        </form>
        <p className="auth-card__footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </Card>
    </main>
  );
}

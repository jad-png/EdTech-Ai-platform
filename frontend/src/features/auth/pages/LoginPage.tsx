import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Button } from "../../../shared/components/ui/Button";
import { Card } from "../../../shared/components/ui/Card";
import { Input } from "../../../shared/components/ui/Input";

export function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(username, password);
      navigate(
        (location.state as { from?: { pathname: string } } | null)?.from
          ?.pathname ?? "/app",
        { replace: true },
      );
    } catch {
      setError("Unable to sign in. Check your username and password.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <svg className="auth-decoration" viewBox="0 0 500 420" aria-hidden="true">
        <defs>
          <linearGradient id="auth-gradient-login" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#auth-gradient-login)"
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
        <h1 className="auth-card__title">Welcome back</h1>
        <p className="auth-card__subtitle">
          Sign in to continue your learning journey.
        </p>
        <form className="auth-form" onSubmit={submit}>
          <Input
            label="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
          {error && (
            <p className="form-error" role="alert" aria-live="polite">
              {error}
            </p>
          )}
          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>
        <p className="auth-card__footer">
          New to EdTech AI? <Link to="/register">Create an account</Link>
        </p>
      </Card>
    </main>
  );
}

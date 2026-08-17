import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { PageContainer } from "../shared/components/ui/PageContainer";
import { PageHeader } from "../shared/components/ui/PageHeader";
import { IconBadge } from "../shared/components/ui/IconBadge";
import { ProfileDropdown } from "./ProfileDropdown";

const navItems = [
  {
    label: "Dashboard",
    to: "/app/dashboard",
    tone: "violet" as const,
    icon: "◫",
  },
  {
    label: "Documents",
    to: "/app/documents",
    tone: "orange" as const,
    icon: "▤",
  },
  { label: "Chat", to: "/app/chat", tone: "teal" as const, icon: "◌" },
  { label: "Flashcards", to: "/app/flashcards", tone: "yellow" as const, icon: "▥" },
  { label: "Quizzes", to: "/app/quizzes", tone: "pink" as const, icon: "✦" },
];

const pageDetails: Record<string, { title: string; description: string }> = {
  "/app": {
    title: "Welcome back",
    description: "Your focused space for learning with AI.",
  },
  "/app/dashboard": {
    title: "Dashboard",
    description: "A clear view of your learning progress.",
  },
  "/app/documents": {
    title: "Documents",
    description: "Organize the material you are learning from.",
  },
  "/app/chat": {
    title: "Chat",
    description: "Ask questions and explore your course material.",
  },
  "/app/quizzes": {
    title: "Quizzes",
    description: "Practice what you know and keep improving.",
  },
  "/app/flashcards": {
    title: "Flashcards",
    description: "Review key ideas and strengthen recall.",
  },
};

export function AppLayout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const page = pageDetails[location.pathname] ?? pageDetails["/app"];
  return (
    <div className="app-shell">
      <header className="app-navbar">
        <div className="app-navbar__inner">
          <NavLink
            className="brand"
            to="/app"
            aria-label="EdTech AI Platform home"
          >
            <span className="brand__mark" aria-hidden="true">
              ✦
            </span>
            <span className="brand__text">
              EdTech <span>AI</span>
            </span>
          </NavLink>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">
              {isMenuOpen ? "Close" : "Open"} navigation
            </span>
            <span aria-hidden="true">{isMenuOpen ? "×" : "☰"}</span>
          </button>
          <nav
            id="main-navigation"
            className={`main-navigation${isMenuOpen ? " main-navigation--open" : ""}`}
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  `main-navigation__link${isActive ? " main-navigation__link--active" : ""}`
                }
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
              >
                <IconBadge tone={item.tone} icon={item.icon} />
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="app-navbar__profile"><ProfileDropdown /></div>
        </div>
      </header>
      <main className="app-main">
        <PageContainer>
          {location.pathname !== "/app/documents" && <PageHeader title={page.title} description={page.description} />}
          <Outlet />
        </PageContainer>
      </main>
    </div>
  );
}

import { useAuthStore } from "../features/auth/store/authStore";
import { Badge } from "../shared/components/ui/Badge";
import { Dropdown } from "../shared/components/ui/Dropdown";

export function ProfileDropdown() {
  const { user, logout } = useAuthStore();
  if (!user) return null;
  const initials = user.username.slice(0, 2).toUpperCase();
  return (
    <Dropdown
      label="Open profile menu"
      trigger={
        <span className="profile-trigger">
          <span className="profile-trigger__avatar">{initials}</span>
          <span className="profile-trigger__name">{user.username}</span>
        </span>
      }
    >
      <div className="profile-menu__identity">
        <span className="profile-menu__name">{user.username}</span>
        <span className="profile-menu__email">{user.email}</span>
        {user.role && <Badge tone="accent">{user.role}</Badge>}
      </div>
      <div className="profile-menu__divider" />
      <button
        type="button"
        className="profile-menu__item"
        role="menuitem"
        onClick={logout}
      >
        Log out
      </button>
    </Dropdown>
  );
}

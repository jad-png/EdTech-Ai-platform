import { apiClient } from "../../../shared/services/apiClient";
import type { AuthTokens, User } from "../../../shared/types/auth";

export const authApi = {
  login(username: string, password: string) {
    return apiClient.post<AuthTokens>("/auth/token/", { username, password });
  },
  register(payload: {
    username: string;
    email: string;
    password: string;
    password2: string;
  }) {
    return apiClient.post<User>("/users/register/", payload);
  },
  me() {
    return apiClient.get<User>("/users/me/");
  },
};

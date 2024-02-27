import Cookies from "js-cookie";

export function getAuthHeaders() {
  const token = Cookies.get("token");
  return {
    "token": token,
    "Content-Type": "application/json",
  };
}

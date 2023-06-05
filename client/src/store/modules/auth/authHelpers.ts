import jwtDecode from "jwt-decode";
import { DecodedToken } from "@/types";

export function getCookieToken(): DecodedToken | null {
  if (typeof document !== "undefined" && typeof document.cookie === "string") {
    const authTokenCookieRegex = /authToken=([^;]+)/;
    const match = document.cookie.match(authTokenCookieRegex);

    if (match && match[1]) {
      const authToken = match[1];
      const decodedToken: DecodedToken = jwtDecode(authToken);
      return decodedToken;
    }
  }
  return null;
}

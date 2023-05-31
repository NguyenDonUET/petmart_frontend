import jwtDecode from "jwt-decode";

export function isTokenExpired(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < Date.now() / 1000;
  } catch (error) {
    console.log(error);
  }
}

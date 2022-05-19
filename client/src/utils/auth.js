import decode from 'jwt-decode';

const AUTH_TOKEN_ID = 'pool_chem_calc_auth_token';

class AuthService {
  constructor() {
    this.authToken = AUTH_TOKEN_ID;
  }

  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user is still logged in
  isLoggedIn() {
    // checks if there is a saved token and it's still valid
    const token = this.getToken();
    // use type coersion to check if the token is NOT undefined and the token is NOT expired
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  // Retrieve the token from localStorage
  getToken() {
    return localStorage.getItem(this.authToken);
  }

  // Set token to localStorage and reload page to the homepage
  login(idToken) {
    localStorage.setItem(this.authToken, idToken);
    window.location.assign('/');
  }

  // lear token from localstorage and force logout with reload
  logout() {
    localStorage.removeItem(this.authToken);
    // reload the page and reset the state of the app
    window.location.assign('/');
  }
}

export default new AuthService();

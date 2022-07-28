
export const RefreshTokenSetup = (res, setToken) => {
  // Timing to renew access token

  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const RefreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    // saveUserToken(newAuthRes.access_token);  <-- save new token
    //localStorage.setItem("authToken", newAuthRes.id_token);
    setToken(newAuthRes.id_token);

    // Setup the other timer after the first one
    setTimeout(RefreshToken, refreshTiming);
  };

  // Setup first refresh timer
  setTimeout(RefreshToken, refreshTiming);
};

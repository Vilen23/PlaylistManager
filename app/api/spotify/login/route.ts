// pages/api/login.js

import { serialize } from 'cookie';

export default function handler(req:any, res:any) {
  // Your "generateRandomString" function implementation goes here
  const generateRandomString = (length:number) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const state = generateRandomString(16);
  // Store the state in a cookie so you can verify it in the callback
  res.setHeader('Set-Cookie', serialize('spotify_auth_state', state, { path: '/' }));

  const client_id = 'CLIENT_ID'; // Your Spotify application's client ID
  const redirect_uri = 'http://localhost:3000/api/callback'; // Ensure this matches your Spotify application settings
  const scope = 'user-read-private user-read-email';

  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  }).toString();

  const loginUrl = `https://accounts.spotify.com/authorize?${queryParams}`;
  res.redirect(loginUrl);
}

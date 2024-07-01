// app/api/spotify/connectUser/route.ts
import { NextRequest, NextResponse } from 'next/server';

const generateRandomString = (num: number): string => {
  const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    result += words[randomIndex];
  }
  return result;
};

export async function GET(req: NextRequest) {
  const clientId = process.env.SPOTIFY_CLIENT_ID || '';
  const redirectUri = 'http://localhost:3000/api/spotify/callback';
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email';

  const queryParams = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  }).toString();

  const authorizeUrl = `https://accounts.spotify.com/authorize?${queryParams}`;

  const response = NextResponse.redirect(authorizeUrl);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  return response;
}


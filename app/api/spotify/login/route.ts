import { NextRequest, NextResponse } from "next/server";

function generateCodeVerifier(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  const base64Digest = btoa(String.fromCharCode(...Array.from(new Uint8Array(digest))));
  return base64Digest
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
// export const GET = async (req: NextRequest, res: NextResponse) => {
//   var state = generateRandomString(16);
//   var scope = "user-read-private user-read-email";
//   var url = "https://accounts.spotify.com/authorize";
//   url += "?response_type=code";
//   url += "&client_id=" + (process.env.SPOTIFY_CLIENT_ID || "");
//   url += "&scope=" + encodeURIComponent(scope);
//   url +=
//     "&redirect_uri=" +
//     encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI || "");
//   url += "&state=" + state;
//   return NextResponse.redirect(url);
// };

export const getUser = async () => {
  const clientId = process.env.SPOTIFY_CLIENT_ID || "";
  const params = new URLSearchParams();
  const code = params.get("code");

  if (!code) {
    redirectToAuthCodeFlow(clientId); 
  } else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    console.log(profile);
  }
};

async function redirectToAuthCodeFlow(client_id: string) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", client_id);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:3000");
  params.append("code_challenge", challenge);
  params.append("code_challenge_method", "S256");
  params.append("scope", "user-read-private user-read-email");

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function getAccessToken(clientId:string,code:string):Promise<string>{
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();

  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000");
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const {access_token} =  await result.json();
  return access_token; 
}

async function fetchProfile(token: string): Promise<any> {
  const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET", headers: { Authorization: `Bearer ${token}` }
  });

  return await result.json();
}
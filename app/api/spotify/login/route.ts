import { NextRequest, NextResponse } from "next/server";


const generateRandomString = (length: number) => {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  
}

export const GET = async(req:NextRequest,res:NextResponse)=>{
    var state = generateRandomString(16);
    var scope = "user-read-private user-read-email";    
    var url = "https://accounts.spotify.com/authorize";
    url += "?response_type=code";
    url += "&client_id=" + (process.env.SPOTIFY_CLIENT_ID || "");
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI || "");
    url += "&state=" + state;
    return NextResponse.redirect(url)
}
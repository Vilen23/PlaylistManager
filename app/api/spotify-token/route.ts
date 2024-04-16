import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export const GET =  async function(req:NextRequest){
    
        const client_id = process.env.SPOTIFY_CLIENT_ID;
        const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        const headers = {
            'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', params, { headers });
            const token = response.data.access_token;
            const spotifyData = await axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF',{
                headers:{
                    'Authorization':`Bearer ${token}` 
                }
            })
            // console.log(spotifyData.data.tracks.items[0].track.album.images);
            return  NextResponse.json(spotifyData.data.tracks.items,{status:200});
        } catch (error) {
            // console.log("Error in tokens",error);
            return new NextResponse("ERROR",{status:500});
        }
    
}
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req:NextRequest, res:NextResponse) => {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const headers = {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
    }

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', params, { headers });
        const token = response.data.access_token;
        const {searchParams} = new URL(req.url);
        const limit = searchParams.get('limit') || 20;
        const offset = searchParams.get('offset') || 0;
        const newReleases = await axios.get('https://api.spotify.com/v1/browse/new-releases',{
            headers:{
                'Authorization':`Bearer ${token}`
            },
            params:{
                limit:limit,
                offset:offset
            }
            
        })
        console.log(newReleases.data.albums);   
        return NextResponse.json(newReleases.data.albums,{status:200})
    } catch (error) {
        console.log(error)
        return new NextResponse("ERROR",{status:500});
    }
}
/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: "img.freepik.com",
                port:''
            },
            {
                protocol: 'https',
                hostname:"cdn.discordapp.com",
                port:''
            },
            {
                protocol: 'https',
                hostname:"avatars.githubusercontent.com",
                port:''
            }
        ]
    }
};

export default nextConfig;

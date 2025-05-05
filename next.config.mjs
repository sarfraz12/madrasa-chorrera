/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                hostname: "images.unsplash.com",
                protocol: "https"
            },
            {
                hostname: "i.pinimg.com",
                protocol: "https"
            },
            {
                hostname: "wallpapercave.com",
                protocol: "https"
            },
            {
                hostname: "wallpaperaccess.com",
                protocol: "https"
            },
            {
                hostname: "cdn.sanity.io",
                protocol: "https"
            },
        ]
    }
};

export default nextConfig;

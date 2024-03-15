/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'raw.githubusercontent.com' },
        ],
        unoptimized: true,
    },
};

module.exports = nextConfig;

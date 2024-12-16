/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  webpack: config => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;

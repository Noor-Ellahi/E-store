// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cactuskids.pk',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'outdoorvitals.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'demo.exptheme.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'p7.hiclipart.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
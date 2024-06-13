/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  experimental: { scrollRestoration: true },
  devIndicators: { buildActivity: false },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pc-kala.storage.iran.liara.space',
        port: '',
        pathname: '/**', // Adjust the pathname pattern according to your needs
      },
    ],
  },
};

export default nextConfig;
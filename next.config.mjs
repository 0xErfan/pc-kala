/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  reactStrictMode: true,
  experimental: { scrollRestoration: true },
  devIndicators: { buildActivity: false }
};

export default nextConfig;
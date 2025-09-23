/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  transpilePackages: ['@waksoccer/core', '@waksoccer/ui']
};

export default nextConfig;
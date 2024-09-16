/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swr: {
    // Configure SWR for data fetching and caching
    // ...
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['example.com'], // Add allowed image domains
    // ...
  },
  sentry: {
    // Configure Sentry for error tracking and performance monitoring
    // ...
  },
  webpack: (config) => {
    // Custom webpack configurations for advanced customization
    // ...
    return config;
  },
  // ... other Next.js configurations
};

module.exports = nextConfig;
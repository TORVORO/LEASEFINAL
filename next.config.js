/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { dev, isServer }) => {
    // Disable webpack caching in development
    if (dev) {
      config.cache = false;
    }
    
    // Add error handling for cache operations
    if (config.cache) {
      config.cache = {
        ...config.cache,
        buildDependencies: {
          config: [__filename],
        },
        name: isServer ? 'server' : 'client',
        version: '1.0.0',
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;
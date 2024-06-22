/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https", 
          hostname: "*",
        },
      ],
    },
    experimental: {
      proxyTimeout: 1000 * 600,
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:9000/api/:path*' // Proxy to Backend
          // Timeout
        },
        {
          source: '/install/:path*',
          destination: 'http://localhost:9000/install/:path*' 
          // destination: 'http://172.17.0.1:9000/install/:path*' // Proxy to Backend
        }
      ]
    }
  };
  
  module.exports = nextConfig;
  
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
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://172.17.0.1:9000/api/:path*' // Proxy to Backend
        },
        {
          source: '/install/:path*',
          destination: 'http://172.17.0.1:9000/install/:path*' 
          // destination: 'http://172.17.0.1:9000/install/:path*' // Proxy to Backend
        }
      ]
    }
  };
  
  module.exports = nextConfig;
  
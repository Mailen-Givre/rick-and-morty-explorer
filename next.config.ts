const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/character/avatar/**',
      },
    ],
  },
};

module.exports = nextConfig;

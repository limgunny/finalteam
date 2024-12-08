const nextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https', // Cloudinary 도메인 추가
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  experimental: {
    serverComponentsExternalPackages: ['formidable'], // formidable 외부 패키지 사용 허용
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'replicate.com', 
      'ext.same-assets.com',
      'lh3.googleusercontent.com'
    ],
  },
  async redirects() {
    return [
      {
        source: '/old-path/:slug',
        destination: '/new-path/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig 
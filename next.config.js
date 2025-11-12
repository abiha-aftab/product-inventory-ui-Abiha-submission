/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  eslint: {
    dirs: ['src', 'app', 'components', 'lib', 'types'],
  },
}

module.exports = nextConfig
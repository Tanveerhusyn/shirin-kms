/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "assets.mixkit.co",
      "hkfgdgzxxyxhxnbxkesa.supabase.co",
      "assets.aceternity.com",
      "myihfbymneayrqkpsbnx.supabase.co",
    ],
  },
}

export default nextConfig

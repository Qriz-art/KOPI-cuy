/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Foto contoh (placeholder) dari Unsplash.
    // Ganti dengan gambar lokal di /public saat data cafe asli sudah siap.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

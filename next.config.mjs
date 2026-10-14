/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Free-licence placeholder photos (Unsplash). Remove once all photos are SPADES' own (in /public/images).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  eslint: { ignoreDuringBuilds: true },
  poweredByHeader: false,
};
export default nextConfig;

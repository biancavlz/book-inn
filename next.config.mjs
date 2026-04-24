/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ngicipjxxdkicjzqxvdq.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  output: "export",
};

export default nextConfig;

// https://ngicipjxxdkicjzqxvdq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

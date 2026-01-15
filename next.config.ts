import type { NextConfig } from "next";

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true, // Usa 'false' se pensi di cambiare idea spesso
      },
    ]
  },
}

export default nextConfig;


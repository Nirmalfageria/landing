/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enable strict mode for better debugging
    swcMinify: true,       // Enable faster builds using SWC minification
    images: {
      domains: ['example.com'], // Add allowed image domains if using next/image
    },
    webpack: (config) => {
      // Custom webpack configuration (if needed)
      return config;
    },
  };
  
  export default nextConfig;
  
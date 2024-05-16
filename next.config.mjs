/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/CongresoEscolapios" : "",
  images: {
    domains: ["images.pexels.com", "st3.depositphotos.com"],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "davidbukolafoundation.org",
        port: "",
        pathname: "/dbf-website-media/images/**", // images is here pending if "videos" has a different configuration in nextjs
      },
    ],
  },
};

export default nextConfig;

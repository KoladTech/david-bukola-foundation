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
  // This will allow us to view the website on our phones. It works only on development server
  // ...(process.env.NODE_ENV === "development" && {
  //   server: {
  //     host: "0.0.0.0",
  //   },
  // }),
};

export default nextConfig;

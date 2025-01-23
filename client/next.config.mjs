const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**", // Accepts any hostname
        },
      ],
    },
  };
  
  export default nextConfig;
  
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/",
  reactStrictMode: true,
  webpack: (config, {
    isServer
  }) => {
    if (!isServer) {
      config.resolve.fallback.child_process = false
    }

    return config
  },
}


export default nextConfig;
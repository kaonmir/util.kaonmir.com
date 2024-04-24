/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
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
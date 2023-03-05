/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000/profile/fsdgdvxchdsfg.test#access_token=A3K2IX3GSN6PAE2GC2ZL3WNZ2L53CGRN&token_type=bearer&expires_in=2592000&scope=email%20personal%20daily%20heartrate%20workout%20tag%20session" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  reactStrictMode: true,
  transpilePackages: ['@lens-protocol'],
}

module.exports = nextConfig

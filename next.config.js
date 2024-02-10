/** @type {import('next').NextConfig} */
const nextConfig = {
    
    // Configuration to fix google avatar not showing sometimes

    async headers() {
        return [
            {
                source: "/:path*", // Basically represents all endpoints of our application
                headers: [
                    { key: "referrer-policy", value: "no-referrer" }
                ]
            }
        ]
    },

    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    }
}

module.exports = nextConfig

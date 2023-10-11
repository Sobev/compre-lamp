/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: './dist',
    env: {
        BASE_URL: 'http://localhost:8787'
    }
}

module.exports = nextConfig

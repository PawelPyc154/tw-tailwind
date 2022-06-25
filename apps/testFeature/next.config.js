/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['tw-tailwind'])

const nextConfig = {
  reactStrictMode: true,
}

module.exports = withTM(nextConfig)

module.exports = nextConfig

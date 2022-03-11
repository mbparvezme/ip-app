/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

let configPWA = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com'],
  },
  configPWA,
}

module.exports = nextConfig

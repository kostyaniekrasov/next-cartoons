/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },

  images: {
    domains: ['i.ytimg.com'],
  },
  sassOptions: {
    additionalData: `$var: red;`,
  },
};

export default nextConfig;

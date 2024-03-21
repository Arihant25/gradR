/** @type {import('next').NextConfig} */
const nextConfig = {};

const config = {
    typescript: {
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        ignoreBuildErrors: true,
    },
};

export default { ...config, ...nextConfig };

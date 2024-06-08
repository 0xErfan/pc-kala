const isGithubActions = process.env.GITHUB_ACTIONS || false;

// Initialize variables for assetPrefix and basePath
let assetPrefix = '';
let basePath = '/';

// Adjust assetPrefix and basePath if running in GitHub Actions
if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { scrollRestoration: true },
  devIndicators: { buildActivity: false },
  assetPrefix: assetPrefix,
  basePath: basePath,
  // Add any additional configurations here
};

// Determine if the build is running in GitHub Actions


// Export the configuration object


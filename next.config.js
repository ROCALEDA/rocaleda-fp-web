/** @type {import('next').NextConfig} */
module.exports = {
  output: "standalone",
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ]
  },
}
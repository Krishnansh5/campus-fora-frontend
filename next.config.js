/* eslint-disable @typescript-eslint/no-var-requires */
import withImages from 'next-images';
import withPWA from 'next-pwa';
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: false,
//   disable: process.env.NODE_ENV === 'development'
// });

const redirects = {
  async redirects() {
    return [
      {
        source: '/dashboards',
        destination: '/dashboards/tasks',
        permanent: true
      }
    ];
  }
};

export default withImages(
  withPWA({
    pwa: {
      dest: 'public',
      register: false,
      disable: process.env.NODE_ENV === 'development'
    },
    redirects: redirects
  })
);

//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Redirect } = require('@nestjs/common');
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  env: {
    baseUrl: "http://localhost:4000/backapi"
  }
};

module.exports = withNx(nextConfig);
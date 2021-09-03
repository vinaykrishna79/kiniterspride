// const { i18n } = require('./next-i18next.config')
// const webpack = require('webpack');
const withImages = require('next-images')
module.exports = withImages({
  reactStrictMode: true,
  // i18n,
  images: {
    loader: 'imgix',
    path: '/',
    domains: ['knitpro-prod.s3.amazonaws.com', "knitpro-app-assets.s3.ap-south-1.amazonaws.com", "knitpro-dev.s3.amazonaws.com", "img.youtube.com", "knitterspride-dev.s3.amazonaws.com"],

  },
  webpack: (config, {
    buildId,
    dev,
    isServer,
    defaultLoaders,
    webpack
    }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.plugins.push(
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            })
        );
        return config;
    },
    // images: {
    // },
    async rewrites() {
      return [
        // {
        //   source: '/a/:slug/:locale',
        //   destination: '/a/:slug'
        // },
        // {
        //   source: '/a/:slug',
        //   destination: '/404'
        // },
        // {
        //   source: '/b/:slug/(en||es)',
        //   destination: '/b/:slug'
        // },
        // {
        //   source: '/b/:slug',
        //   destination: '/404'
        // },
        // {
        //   source: '/c/:slug/:locale',
        //   destination: '/c/:slug'
        // },
        // {
        //   source: '/c/:slug',
        //   destination: '/404'
        // },
        // {
        //   source: '/d/:brand/:slug/:locale',
        //   destination: '/d/:brand/:slug'
        // },
        // {
        //   source: '/d/:brand/:slug',
        //   destination: '/404'
        // },
        // {
        //   source: '/d/:brand',
        //   destination: '/404'
        // },
        // { 
        //   source: '/e/:brand/:slug/:locale',
        //   destination: '/e/:brand/:slug'
        // },
        // {
        //   source: '/e/:brand/:slug',
        //   destination: '/404'
        // },
        // {
        //   source: '/e/:brand',
        //   destination: '/404'
        // },
        {
          source: '/:locale(en||es)',
          destination: '/'
        },
        {
          source: '/:slug/:locale(en||es)',
          destination: '/:slug'
        },
      ]
    },
})

// const { i18n } = require('./next-i18next.config')
// const webpack = require('webpack');
require('dotenv').config()

const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images'); 
module.exports = withPlugins([
  optimizedImages,
  {
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
        config.plugins.push(
          new webpack.EnvironmentPlugin(process.env)
        )
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
        // {
        //   source: '/:locale(en||es)',
        //   destination: '/'
        // },
        {
          source: '/:slug/:locale(en||es)',
          destination: '/:slug'
        },
      ]
    },
    async redirects() {
      return [
        {
          source: '/',
          destination: '/en',
          permanent: true
        },
        {
          source: '/about-us',
          destination: '/about-us/en',
          permanent: true
        },
        {
          source: '/bags-cases',
          destination: '/bags-cases/en',
          permanent: true
        },
        {
          source: '/blog',
          destination: '/blog/en',
          permanent: true
        },
        {
          source: '/contact',
          destination: '/contact/en',
          permanent: true
        },
        {
          source: '/crochet',
          destination: '/crochet/en',
          permanent: true
        },
        {
          source: '/faq',
          destination: '/faq/en',
          permanent: true
        },
        {
          source: '/find-our-stores',
          destination: '/find-our-stores/en',
          permanent: true
        },
        {
          source: '/infrastructure',
          destination: '/infrastructure/en',
          permanent: true
        },
        {
          source: '/knitting-accessories',
          destination: '/knitting-accessories/en',
          permanent: true
        },
        {
          source: '/knitting-needles',
          destination: '/knitting-needles/en',
          permanent: true
        },
        {
          source: '/newsletter',
          destination: '/newsletter/en',
          permanent: true
        },
        {
          source: '/our-people',
          destination: '/our-people/en',
          permanent: true
        },
        {
          source: '/privacy-policy',
          destination: '/privacy-policy/en',
          permanent: true
        },
        {
          source: '/product-catalog',
          destination: '/product-catalog/en',
          permanent: true
        },
        {
          source: '/replacementpolicy',
          destination: '/replacementpolicy/en',
          permanent: true
        },
        {
          source: '/resourcesinner',
          destination: '/resourcesinner/en',
          permanent: true
        },
        {
          source: '/resources',
          destination: '/resources/en',
          permanent: true
        },
        {
          source: '/sets',
          destination: '/sets/en',
          permanent: true
        },
        {
          source: '/social-contribution',
          destination: '/social-contribution/en',
          permanent: true
        },
        {
          source: '/sustainability',
          destination: '/sustainability/en',
          permanent: true
        },
        {
          source: '/terms',
          destination: '/terms/en',
          permanent: true
        },
        {
          source: '/whatsnew',
          destination: '/whatsnew/en',
          permanent: true
        },
        //dynamic pages
        {
          source: '/a/:slug',
          destination: '/a/:slug/en',
          permanent: true
        },
        {
          source: '/b/:slug',
          destination: '/b/:slug/en',
          permanent: true
        },
        {
          source: '/c/:slug',
          destination: '/c/:slug/en',
          permanent: true
        },
        {
          source: '/d/:brandSlug/:productSlug',
          destination: '/d/:brandSlug/:productSlug/en',
          permanent: true
        },
        {
          source: '/e/:typeSlug/:productSlug',
          destination: '/e/:typeSlug/:productSlug/en',
          permanent: true
        },
      ]
    },
}])

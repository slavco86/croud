const pkg = require("./package");

const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "universal",

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: "#FFFFFF" },

  /*
  ** Global CSS
  */
  css: ["vuetify/src/stylus/main.styl"],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: ["@/plugins/vuetify"],

  /*
  ** Nuxt.js modules
  */
  modules: ["@nuxtjs/apollo"],

  // Give apollo module options
  apollo: {
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: "https://ln85mww75q.lp.gql.zone/graphql"
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  }
};

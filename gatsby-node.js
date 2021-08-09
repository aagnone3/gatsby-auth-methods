/**
 * Implement Gatsby's Node APIs in this file.
 * This allows tapping into Gatsby's server-side build pipeline to customize it.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions

    /**
     * The dashboard (which lives under `/app`) is a client-only route. That
     * means that we don’t want to build it server-side because it depends on data
     * that we won’t have until a user logs in. By using `matchPath`, we’re able
     * to specify the entire `/app` path as a client-only section, which means
     * Gatsby will skip any `/app/*` pages during the build step.
     */
    if (page.path.match(/^\/app/)) {
        page.matchPath = `/app/*`

        // Update the page.
        createPage(page)
    }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        /*
         * During the build step, `auth0-js` will break because it relies on
         * browser-specific APIs. Fortunately, we don’t need it during the build.
         * Using Webpack’s null loader, we’re able to effectively ignore `auth0-js`
         * during the build. (See `src/services/auth.js` to see how we prevent this
         * from breaking the app.)
         */
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /auth0-js/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
}
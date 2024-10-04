module.exports = {
    plugins: [
        require("autoprefixer")(),
        require("./postcss/postcss-style-props.min.cjs")({enableLogs: true}),
        require("postcss-mixins")(),
        require("postcss-nested")(),
    ],
    parser: require("postcss-comment"),
};

import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
    kit: {
        adapter: adapter({
            pages: 'build',
            assets: 'build',
            fallback: null, // You can use 'index.html' for single-page app behavior
            precompress: false,
            strict: true
        }),
        paths: {
            base: dev ? '' : '/REPO_NAME' // replace REPO_NAME with your actual repo name
        }
    }
};

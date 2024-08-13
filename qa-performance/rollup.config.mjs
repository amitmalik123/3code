import {globSync} from 'glob'

const entries = globSync('./src/entrypoints/*.js');

const EXTERNAL_PATTERN = /^(k6|https?\:\/\/)(\/.*)?/;

export default entries.map((entry) => ({
    input: entry,
    output: {
        dir: './dist',
    },
    external: (id) => {
        return EXTERNAL_PATTERN.test(id)
    }
}))
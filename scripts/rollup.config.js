import {join} from 'path'
import babel from 'rollup-plugin-babel'
import includePaths from 'rollup-plugin-includepaths'
import postcss from 'rollup-plugin-postcss'
import posthtml from 'rollup-plugin-posthtml-template'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'
import license from 'rollup-plugin-license'

const classPrefix = process.env.npm_package_config_classPrefix
const isMinification = process.env.BUILD === 'minification'
const isModule = process.env.BUILD === 'module'
const srcToPaths = (paths, value) => {
  paths[value] = join(__dirname, '..', 'src', value, 'index.js')

  return paths
}
let cssExportMap = {}


let config = {
  entry: 'src/index.js',
  dest: `dist/${process.env.npm_package_config_name}.js`,
  format: 'umd',
  moduleContext: 'window',
  globals: {'uploadcare-widget': 'uploadcare'},
  external: ['uploadcare-widget'],
  moduleName: process.env.npm_package_config_library,
  sourceMap: true,
  plugins: [
    includePaths({
      include: [
        'components',
        'images',
        'locale',
        'tools',
      ].reduce(srcToPaths, {}),
    }),
    postcss({
      extensions: ['.pcss'],
      plugins: [
        require('postcss-nested'),
        require('postcss-calc'),
        require('postcss-color-function'),
        require('postcss-flexbugs-fixes'),
        require('postcss-css-variables'),
        require('autoprefixer'),
        require('postcss-reporter'),
        require('postcss-modules')({
          generateScopedName: `${classPrefix}[local]`,
          getJSON: (id, json) => {
            cssExportMap[id] = json
          },
        }),
        require('cssnano'),
      ],
      getExport: (id) => cssExportMap[id],
      combineStyleTags: true,
    }),
    posthtml({
      include: '**/*.{html,svg}',
      template: true,
    }),
    babel(),
    filesize(),
  ],
}

if (isMinification) {
  config.dest = `dist/${process.env.npm_package_config_name}.min.js`
  config.sourceMap = false
  config.plugins.push(uglify())
}
if (isModule) {
  config.dest = `dist/${process.env.npm_package_config_name}.es.js`
  config.format = 'es'
  config.sourceMap = true
}

config.plugins.push(license({banner: {file: join(__dirname, 'rollup.banner.txt')}}))

export default config

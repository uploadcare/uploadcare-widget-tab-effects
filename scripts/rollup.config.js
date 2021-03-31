import {join} from 'path'
import babel from 'rollup-plugin-babel'
import includePaths from 'rollup-plugin-includepaths'
import postcss from 'rollup-plugin-postcss'
import posthtml from 'rollup-plugin-posthtml-template'
import filesize from 'rollup-plugin-filesize'
import uglify from 'rollup-plugin-uglify'
import license from 'rollup-plugin-license'
import replacement from 'rollup-plugin-module-replacement'


const classPrefix = process.env.npm_package_config_classPrefix
const isMinified = process.env.MINIFIED === 'true'
const isEnglishOnly = process.env.ENGLISH === 'true'
const isModule = process.env.ESM === 'true'
const srcToPaths = (paths, value) => {
  paths[value] = join(__dirname, '..', 'src', value, 'index.js')

  return paths
}
let cssExportMap = {}
let paths = [
  'components',
  'images',
  'locale',
  'tools',
].reduce(srcToPaths, {})

// When using an english-only build, don't include other locale copy
if (isEnglishOnly) {
  paths['locale'] = join(__dirname, '..', 'src', 'locale', 'en-only', 'index.js')
}

// Add any necessary suffixes to the output file name
const suffixes = `${isModule ? '.es' : ''}${isEnglishOnly ? '.lang.en' : ''}${isMinified ? '.min' : ''}`

let config = {
  entry: 'src/index.js',
  dest: `dist/${process.env.npm_package_config_name}${suffixes}.js`,
  format: isModule ? 'es' : 'umd',
  moduleContext: 'window',
  globals: {'uploadcare-widget': 'uploadcare'},
  external: ['uploadcare-widget'],
  moduleName: process.env.npm_package_config_library,
  sourceMap: !isMinified,
  plugins: [
    includePaths({include: paths}),
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

// Minified and english-only builds import a different script from `uploadcare-widget`
const replacementWidgetScript =
  (isMinified && isEnglishOnly && 'uploadcare-widget/uploadcare.lang.en.min') ||
  (isMinified && 'uploadcare-widget/uploadcare.min') ||
  (isEnglishOnly && 'uploadcare-widget/uploadcare.lang.en')

if (replacementWidgetScript) {
  config.external = [replacementWidgetScript]
  config.globals = {[replacementWidgetScript]: 'uploadcare'}
  config.plugins.unshift(replacement({
    entries: [
      {
        find: 'uploadcare-widget',
        replacement: replacementWidgetScript,
      },
    ],
  }))
}

// Minified builds also reduce the bundle size by uglifying code
if (isMinified) {
  if (isModule) throw ('Uglifying the ESM build currently fails.')
  config.plugins.push(uglify())
}

config.plugins.push(license({banner: {file: join(__dirname, 'rollup.banner.txt')}}))

export default config

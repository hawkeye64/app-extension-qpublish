/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

const extendQuasarConf = function (conf) {
  // make sure qpublish boot file is registered
  conf.boot.push('~@quasar/quasar-app-extension-qpublish/src/boot/qpublish.js')
  console.log(` App Extension (qpublish) Info: 'Adding qpublish boot reference to your quasar.conf.js'`)

  // make sure boot & component files transpile
  conf.build.transpileDependencies.push(/quasar-app-extension-qpublish[\\/]src/)

  conf.css.push('~@quasar/quasar-app-extension-qpublish/src/component/ComponentApi/ComponentApi.styl')
  console.log(` App Extension (qpublish) Info: 'Adding stylus css reference to your quasar.conf.js'`)
}

module.exports = function (api) {
  api.compatibleWith('@quasar/app', '^1.0.0')

  // register JSON api
  // api.registerDescribeApi('QFlashcard', '../component/QFlashcard.json')
  // api.registerDescribeApi('QFlashcardSection', '../component/QFlashcardSection.json')

  // extend quasar.conf
  api.extendQuasarConf(extendQuasarConf)
}

import Vue from 'vue'

// Styles
import './ComponentApi.styl'

// Utils
import {
  QBadge
} from 'quasar'

export default Vue.extend({
  name: 'component-api-item',

  props: {
    name: {
      type: String,
      required: true
    },
    json: {
      type: Object,
      required: true
    }
  },

  methods: {

    __renderSubitem (h, name, item) {
      return h('div', {
        staticClass: 'component-api__row component-api__row--bordered row'
      }, [
        this.__renderName(h, name, 'bg-blue-grey-4'),
        this.__renderType(h, item),
        this.__renderRequired(h, item),
        this.__renderSync(h, item),
        this.__renderDefault(h, item),
        this.__renderApplicable(h, item),

        this.__renderDesc(h, item),
        this.__renderValues(h, item),
        this.__renderExamples(h, item),
        this.__renderParams(h, item),
        this.__renderDefinitions(h, item)
      ])
    },

    __renderSubitems (h, subitem) {
      const keys = Object.keys(subitem)
      return keys.map(key => [
        this.__renderSubitem(h, key, subitem[key])
      ])
    },

    __renderParams (h, json) {
      if (json.params === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-12'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Parameter' + (Object.keys(json.params).length > 1 ? 's' : '')),
        h('div', {
          // staticClass: 'component-api__row component-api__row--bordered row'
        }, [
          ...this.__renderSubitems(h, json.params)
        ])
      ])
    },

    __renderDefinitions (h, json) {
      if (json.definition === void 0) return ''
      const keys = Object.keys(json.definition)
      return keys.map(key => h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-12'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Definition' + (Object.keys(json.definition).length > 1 ? 's' : '')),
        h('div', {
          // staticClass: 'component-api__row component-api__row--bordered row'
        }, [
          this.__renderSubitem(h, key, json.definition[key])
        ])
      ]))
    },

    __renderValues (h, json) {
      if (json.values === void 0 || json.values.length <= 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-12'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Value' + (json.values.length > 1 ? 's' : '')),
        h('div', {
          staticClass: 'component-api__row--values'
        }, json.values.join(', '))
      ])
    },

    __renderExample (h, example) {
      const json = '```js\n' + example + '\n```'
      return h('q-markdown', {
        staticClass: 'component-api__row--example'
      }, json)
    },

    __renderExamples (h, json) {
      if (json.examples === void 0 || json.examples.length <= 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-12'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Example' + (json.examples.length > 1 ? 's' : '')),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          json.examples.map((example, index) => this.__renderExample(h, example))
        ])
      ])
    },

    __renderDesc (h, json) {
      if (json.desc === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-12'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Description'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('q-markdown', json.desc)
        ])
      ])
    },

    __renderSync (h, json) {
      if (json.sync === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-4'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Sync'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('div', json.sync)
        ])
      ])
    },

    __renderRequired (h, json) {
      if (json.required === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-4'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Required'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('div', json.required)
        ])
      ])
    },

    __renderApplicable (h, json) {
      if (json.applicable === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-4'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Applicable'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('div', json.applicable.join(', '))
        ])
      ])
    },

    __renderDefault (h, json) {
      if (json.default === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-4'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Default'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('div', json.default)
        ])
      ])
    },

    __renderType (h, json) {
      if (json.type === void 0) return ''
      console.log('TYPE:', json.type)
      const type = Array.isArray(json.type) ? json.type.join(' | ') : json.type
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-4'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Type'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('div', type)
        ])
      ])
    },

    __renderName (h, name, color) {
      return h('div', {
        staticClass: 'component-api__row--item col-grow'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Name'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h(QBadge, {
            staticClass: `property-name ${color}`
          }, name)
        ])
      ])
    },

    __render (h) {
      return h('div', {
        staticClass: 'row full-width'
      }, [
        this.__renderName(h, this.name, 'bg-orange'),
        this.__renderType(h, this.json),
        this.__renderRequired(h, this.json),
        this.__renderSync(h, this.json),
        this.__renderDefault(h, this.json),
        this.__renderApplicable(h, this.json),

        this.__renderDesc(h, this.json),
        this.__renderValues(h, this.json),
        this.__renderExamples(h, this.json),
        this.__renderParams(h, this.json),
        this.__renderDefinitions(h, this.json)
      ])
    }
  },

  render (h) {
    return this.__render(h)
  }
})

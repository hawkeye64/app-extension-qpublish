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

    __renderValues (h) {
      if (this.json.values === void 0 || this.json.values.length <= 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-12'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Value' + (this.json.values.length > 1 ? 's' : '')),
        h('div', {
          staticClass: 'component-api__row--values'
        }, this.json.values.join(', '))
      ])
    },

    __renderExamples (h) {
      if (this.json.examples === void 0 || this.json.examples.length <= 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-12'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Example' + (this.json.examples.length > 1 ? 's' : '')),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          this.json.examples.map((example, index) => h('div', {
            staticClass: 'component-api__row--example'
          }, example))
        ])
      ])
    },

    __renderDesc (h) {
      if (this.json.desc === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-12'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Description'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('q-markdown', this.json.desc)
        ])
      ])
    },

    __renderRequired (h) {
      if (this.json.required === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-4'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Required'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('div', this.json.required)
        ])
      ])
    },

    __renderDefault (h) {
      if (this.json.default === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-4'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Default'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('div', this.json.default)
        ])
      ])
    },

    __renderType (h) {
      if (this.json.type === void 0) return ''
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-4'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Type'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h('div', Array.isArray(this.json.type) ? this.json.type.join(' | ') : this.json.type)
        ])
      ])
    },

    __renderName (h) {
      return h('div', {
        staticClass: 'component-api__row--item col-xs-12 col-sm-4'
      }, [
        h('div', {
          staticClass: 'component-api__row--label'
        }, 'Name'),
        h('div', {
          staticClass: 'component-api__row--value'
        }, [
          h(QBadge, {
            staticClass: 'property-name bg-orange'
          }, this.name)
        ])
      ])
    },

    __render (h) {
      return h('div', {
        staticClass: 'row full-width'
      }, [
        this.__renderName(h),
        this.__renderType(h),
        this.__renderRequired(h),
        this.__renderDefault(h),
        this.__renderDesc(h),
        this.__renderValues(h),
        this.__renderExamples(h)
      ])
    }
  },

  render (h) {
    return this.__render(h)
  }
})

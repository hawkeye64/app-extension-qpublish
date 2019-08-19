import Vue from 'vue'

// Styles
import './ComponentApi.styl'

// Utils
import ComponentApiItem from './ComponentApiItem'
import {
  QItem,
  QList
} from 'quasar'

export default Vue.extend({
  name: 'component-api-list',

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

  data () {
    return {}
  },

  computed: {
    headings () {
      return Object.keys(this.json)
    }
  },

  methods: {

    __render (h) {
      return h(QList, {
        staticClass: 'component-api__list',
        props: {
          separator: true
        }
      }, [
        ...this.headings.map(heading => h(QItem, {
          key: this.name + '-' + heading
        }, [
          h(ComponentApiItem, {
            props: {
              name: heading,
              json: this.json[heading]
            }
          })
        ]))
      ])
    }
  },

  render (h) {
    return this.__render(h)
  }
})

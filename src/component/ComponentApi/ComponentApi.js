import Vue from 'vue'

// Styles
import './ComponentApi.styl'

// Utils
import { slugify } from '../utils.js'
import ComponentApiList from './ComponentApiList'
import {
  QCard,
  QTabs,
  QTab,
  QTabPanels,
  QTabPanel,
  QToolbar,
  QToolbarTitle,
  QSpace,
  QSeparator
} from 'quasar'

export default Vue.extend({
  name: 'component-api',

  components: {
    ComponentApiList: () => import('./ComponentApiList')
  },

  props: {
    title: {
      type: String,
      required: true
    },
    json: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      default: 'Vue Component'
    },
    startingTab: String,
  },

  data () {
    return {
      tab: 'props'
    }
  },

  mounted () {
    this.tab = this.startingTab || this.tab
  },

  computed: {
    slugifiedTitle () {
      return slugify(this.title)
    },

    headings () {
      return Object.keys(this.json).filter(k => k !== 'type')
    }
  },

  methods: {

    copyHeading (id) {
      const text = window.location.origin + window.location.pathname + '#' + id

      var textArea = document.createElement('textarea')
      textArea.className = 'fixed-top'
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      document.execCommand('copy')
      document.body.removeChild(textArea)

      this.$q.notify({
        message: 'Anchor has been copied to clipboard.',
        color: 'white',
        textColor: 'primary',
        icon: 'done',
        position: 'top',
        timeout: 2000
      })
    },

    __renderToolbarTitle (h) {
      return h(QToolbarTitle, {
        staticClass: 'example-title',
        style: 'padding: 5px 20px;',
        on: {
          click: e => { this.copyHeading(this.slugifiedTitle) }
        }
      }, [
        h('span', {
          staticClass: 'ellipsis'
        }, this.title)
      ])
    },

    __renderRibbon (h) {
      return h('q-ribbon', {
        props: {
          position: 'left',
          color: 'rgba(0,0,0,.58)',
          backgroundColor: '#c0c0c0',
          leafColor: '#a0a0a0',
          leafPosition: 'bottom',
          decoration: 'rounded-out'
        }
      }, [
        this.__renderToolbarTitle(h)
      ])
    },

    __renderToolbar (h) {
      return h(QToolbar, [
        this.__renderRibbon(h),
        h(QSpace),
        h('div', {
          staticClass: 'col-auto text-grey text-caption'
        }, this.type)
      ])
    },

    __renderTabs (h) {
      return h(QTabs, {
        staticClass: 'text-grey',
        props: {
          value: this.tab,
          dense: true,
          activeColor: 'primary',
          indicatorColor: 'primary',
          align: 'justify',
          narrowIndicator: true
        },
        on: {
          input: v => { this.tab = v }
        }
      }, [
        ...this.headings.map(heading => h(QTab, {
          key: heading + '-tab',
          props: {
            name: heading,
            label: heading
          }
        }))
      ])
    },

    __renderTabPanels (h) {
      return h(QTabPanels, {
        props: {
          value: this.tab,
          animated: true
        },
        on: {
          input: v => { this.tab = v}
        }
      }, [
        ...this.headings.map(heading => h(QTabPanel, {
          key: heading + '-panel',
          staticClass: 'q-pa-none',
          props: {
            name: heading
          }
        }, [
            h('div', {
              staticClass: 'component-api__container'
            }, [
              h(ComponentApiList, {
                props: {
                  name: heading,
                  json: this.json[heading]
                }
              })
            ])
          ]
        ))
      ])
    },

    __renderCard (h) {
      return h(QCard, {
        staticClass: 'no-shadow',
        props: {
          flat: true,
          bordered: true
        }
      }, [
        this.__renderToolbar(h),
        h(QSeparator),
        this.__renderTabs(h),
        h(QSeparator),
        this.__renderTabPanels(h)
      ])
    },

    __renderSection (h) {
      return h('section', {
        domProps: {
          id: this.slugifiedTitle
        },
        staticClass: 'q-pa-md overflow-auto'
      }, [
        this.__renderCard(h)
      ])
    },

    __render (h) {
      return h('div', [
        this.__renderSection(h)
      ])
    }
  },

  render (h) {
    return this.__render(h)
  }
})

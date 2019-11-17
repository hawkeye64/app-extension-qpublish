import Vue from 'vue'

// Mixins
import ComponentMixin from './ComponentMixin'

// Utils
import ComponentApiList from './ComponentApiList'
import {
  QBadge,
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
  name: 'ComponentApi',

  mixins: [ComponentMixin],

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
    startingTab: String
  },

  data () {
    return {
      ready: false,
      currentTab: 'props',
      currentInnerTab: 'model',
      api: void 0,
      filteredApi: void 0,
      tabs: [],
      innerTabs: {},
      tabCount: {},
      innerTabCount: {},
      innerTabContent: {}
    }
  },

  mounted () {
    this.currentTab = this.startingTab || this.currentTab
    this.__parseJson(this.json)
  },

  computed: {
    slugifiedTitle () {
      return this.slugify(this.title)
    },

    headings () {
      // return Object.keys(this.json).filter(k => k !== 'type')
      return this.tabs
    },

    currentTabMaxCategoryPropCount () {
      if (this.aggregationModel[this.currentTab]) {
        let max = -1
        for (let category in this.filteredApi[this.currentTab]) {
          let count = this.apiInnerCount(this.currentTab, category)
          if (count > max) {
            max = count
          }
        }
        return max
      }

      return 0
    }
  },

  methods: {
    __parseJson ({ ...api }) {
      if (api === void 0) {
        // no api
        this.ready = true
        return
      }

      if (api.type !== void 0) {
        delete api.type
      }

      // get a count of items within each top-level tab menu
      for (let propKey of Object.keys(api)) {
        this.$set(this.tabs, propKey, Object.keys(api[propKey]).length)
      }

      if (api.props !== void 0) {
        for (let propKey of Object.keys(api.props)) {
          const props = api.props[propKey]
          if (this.innerTabContent[props.category] === void 0) {
            this.$set(this.innerTabContent, props.category, {})
          }
          this.$set(this.innerTabContent[props.category], propKey, { ...props })
        }

        this.$set(this, 'innerTabCount', {})
        for (let propKey of Object.keys(this.innerTabContent)) {
          this.$set(this.innerTabCount, propKey, Object.keys(this.innerTabContent[propKey]).length)
        }
      }

      this.ready = true
    },

    __renderToolbarTitle (h) {
      return h(QToolbarTitle, {
        staticClass: 'example-title',
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
        staticClass: 'bg-grey-2 text-grey-7 text-caption',
        props: {
          value: this.currentTab,
          dense: true,
          activeColor: 'primary',
          indicatorColor: 'primary',
          align: 'left',
          narrowIndicator: true
        },
        on: {
          input: v => { this.currentTab = v }
        }
      }, [
        ...Object.keys(this.tabs).map(propKey => h(QTab, {
          key: propKey + '-tab',
          props: {
            name: propKey
          },
          scopedSlots: {
            default: () => this.__renderTabSlot(h, propKey, this.tabs[propKey])
          }
        }))
      ])
    },

    __renderTabSlot (h, label, count) {
      return h('div', {
        staticClass: 'row no-wrap items-center'
      }, [
        h('span', {
          staticClass: 'q-mr-xs text-uppercase text-weight-medium'
        }, label),
        h(QBadge, [ count ])
      ])
    },

    __renderTabPanels (h) {
      return h(QTabPanels, {
        props: {
          value: this.currentTab,
          animated: true
        },
        on: {
          input: v => { this.currentTab = v }
        }
      }, [
        ...Object.keys(this.tabs).map(propKey => h(QTabPanel, {
          key: propKey + '-panel',
          staticClass: 'q-pa-none',
          props: {
            name: propKey
          }
        }, [
          this.__renderApiList(h, propKey, this.json[propKey])
        ]))
      ])
    },

    __renderApiList (h, name, api) {
      return h('div', {
        staticClass: 'component-api__container'
      }, [
        h(ComponentApiList, {
          props: {
            name: name,
            json: api
          }
        })
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
    if (this.ready === true) {
      return this.__render(h)
    }
    return void 0
  }
})

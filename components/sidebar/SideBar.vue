<template lang="pug">
sidebar-menu-akahon(
  :menuItems="menus"
  :isUsedVueRouter="true"
  :menuTitle="'SENTIPULSE'"
  :menuLogo="require(`../../assets/img/sentipulse-logo.png`)"
  :profileImg="require(`../../assets/img/profile.png`)"
  :bgColor="'white'"
  :secondaryColor="$vuetify.theme.themes.light.primary"
  :logoTitleColor="$vuetify.theme.themes.light.primary"
  :iconsColor="$vuetify.theme.themes.light.primary"
  :searchInputTextColor="$vuetify.theme.themes.light.secondary"
  :menuItemsHoverColor="$vuetify.theme.themes.light.background"
  :menuItemsTextColor="$vuetify.theme.themes.light.secondary"
  )
</template>

<script>
import SidebarMenuAkahon from './SidebarManuAkahon.vue'

export default {
  name: 'SideBar',
  components: { SidebarMenuAkahon },
  data () {
    return {
      menus: [
        {
          link: '/dashboard',
          name: 'Dashboard',
          tooltip: 'Dashboard',
          icon: 'bx-grid-alt'
        },
        {
          link: '/issue',
          name: 'Customer Sentiments',
          tooltip: 'Customer Sentiments',
          icon: 'bx-bullseye'
        },
        {
          link: '/',
          name: 'Setting',
          tooltip: 'Setting',
          icon: 'bx-cog'
        }
      ]
    }
  },
  computed: {

  },
  methods: {
    goToPath (link) {
      this.$router.push({
        path: link
      })
    }
  }
}
</script>

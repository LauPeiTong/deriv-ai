<template lang="pug">
  .user-data
    v-tabs(
      v-model="tab"
      align-with-title
    )
      v-tabs-slider(color="primary")
      v-tab.rounded-t-xl.text-capitalize(
        v-for="t in tabs"
        :key="t"
      ) {{ t }}

    v-card.fill-height.shadow.pa-4.rounded-b-lg.rounded-tr-lg(elevation="0")
      .div.d-flex.flex-column(v-if="isLoading")
        v-progress-circular.mx-auto(color="primary" indeterminate)
        p.pt-3.secondary--text.text-center Loading customer sentiment result...
      v-tabs-items(v-else v-model="tab")
        v-tab-item
          credit-score-vue(:issue="issue")
        v-tab-item
          financial-info-vue(:issue="issue")
        //v-tab-item
        //  employment-status-vue
        //v-tab-item
        //  non-bank-data-vue

</template>

<script>
import { mapGetters } from 'vuex'
import CreditScoreVue from './CreditScore.vue'
import EmploymentStatusVue from './EmploymentStatus.vue'
import FinancialInfoVue from './FinancialInfo.vue'
import NonBankDataVue from './NonBankData.vue'

export default {
  name: 'UserProfile',
  components: {
    CreditScoreVue,
    EmploymentStatusVue,
    FinancialInfoVue,
    NonBankDataVue
  },
  props: {
    issue: null,
    isLoading: null
  },
  data () {
    return {
      tab: null,
      tabs: ['Sentiment Score', 'Next Steps']
    }
  },
  computed: {
    ...mapGetters({
    })
  }
}
</script>

<style scoped>
:deep(.v-tabs .v-tabs-bar) {
  background-color: transparent;
}

.v-tab {
  margin: 0 !important;
  font-size: 12px;
}

.v-tab:not(.v-tab--active) {
  border: solid 4px white;
  border-bottom-style: none;
  background-color: #F4F6FB;
  color: #bb0000;
  padding: 0px 12px;
  margin-top: 8px !important;
}

.v-tab--active {
  background-color: #bb0000;
  color: white;
  padding: 0px 16px;
  margin-top: 4px !important;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.30) !important;
}
</style>

<!--<template lang="pug">-->
<!--.financial-info-->
<!--  p.font-weight-medium Next Steps-->
<!--  v-card(outlined)-->
<!--    v-list-->
<!--      v-list-item-group(v-model="checkedItems")-->
<!--        v-list-item(v-for="item in steps")-->
<!--          //- v-list-item-content(:class="{'strikethrough': checkedItems.includes(index)}")-->
<!--          v-checkbox(-->
<!--            :label="item"-->
<!--            :value="index"-->
<!--          )-->
<!--</template>-->

<!--<script>-->
<!--import { mapGetters } from 'vuex'-->
<!--export default {-->
<!--  name: 'FinancialInfo',-->
<!--  components: {-->
<!--  },-->
<!--  data () {-->
<!--    return {-->
<!--      customer: null,-->
<!--      financialData: null,-->
<!--      nextStepsString: `Prioritize suggested features based on user impact and feasibility, Assign tasks to development team and set milestones, Notify user of planned improvements and gather further feedback, Conduct A/B testing of new features to measure effectiveness, Monitor user feedback post-implementation for continuous improvement`,-->
<!--      steps: []-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapGetters({-->
<!--      getCustomerById: 'issue.js/getCustomerById'-->
<!--    })-->
<!--  },-->
<!--  watch: {-->
<!--    $route (to, from) {-->
<!--      this.customer = to.params.customer-->
<!--    }-->
<!--  },-->
<!--  created () {-->
<!--    // console.log(this.$route.params)-->
<!--    this.splitNextSteps();-->
<!--    this.customer = this.getCustomerById(this.$route.params.id)-->
<!--    if (this.customer.name === 'Khairul bin Ahmad') {-->
<!--      this.financialData = [-->
<!--        {-->
<!--          col: 6,-->
<!--          icon: 'mdi-hand-coin',-->
<!--          title: 'Annual Salary',-->
<!--          value: 'MYR 36,000'-->
<!--        },-->
<!--        {-->
<!--          col: 6,-->
<!--          icon: 'mdi-file',-->
<!--          title: 'Debt-To-Income Ratio',-->
<!--          value: '42%'-->
<!--        }-->
<!--      ]-->
<!--    } else {-->
<!--      this.financialData = [-->
<!--        {-->
<!--          col: 6,-->
<!--          icon: 'mdi-hand-coin',-->
<!--          title: 'Annual Salary',-->
<!--          value: 'MYR 64,321'-->
<!--        },-->
<!--        {-->
<!--          col: 6,-->
<!--          icon: 'mdi-file',-->
<!--          title: 'Debt-To-Income Ratio',-->
<!--          value: '18%'-->
<!--        }-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    splitNextSteps() {-->
<!--      // Split the nextStepsString by commas and remove any surrounding whitespace-->
<!--      this.steps = this.nextStepsString.split(',').map(item => item.trim());-->
<!--    }-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

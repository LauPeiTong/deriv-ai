<template lang="pug">
  .financial-info
    p.font-weight-medium Next Steps
    v-card(outlined)
      v-list
        v-list-item-group(v-model="checkedItems")
          v-list-item(v-for="item in issue?.next_steps" :key="item")
            v-checkbox(
              :label="item"
              :value="item"
            )
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NextSteps',
  components: {
  },
  props: {
    issue: null
  },
  data () {
    return {
      customer: null,
      financialData: null,
      nextStepsString: `Prioritize suggested features based on user impact and feasibility, Assign tasks to development team and set milestones, Notify user of planned improvements and gather further feedback, Conduct A/B testing of new features to measure effectiveness, Monitor user feedback post-implementation for continuous improvement`,
      checkedItems: []
    };
  },
  computed: {
    ...mapGetters({
    })
  },
  watch: {
    $route (to, from) {
      this.customer = to.params.customer
    }
  },
  methods: {
  },
}
</script>

<style scoped>

</style>

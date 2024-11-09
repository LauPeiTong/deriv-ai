<template lang="pug">
v-card.fill-height.shadow.pa-4.rounded-lg.white(elevation="0")
  .sentiment-timeline
    .d-flex.justify-space-between.align-center.mb-2
      p.mb-0.font-weight-medium Timeline
      v-chip.my-1(
        :color="getChipColor(issue.status)"
        :textColor="getColor(issue.status)"
        pill
      )
        p.mb-0 {{ issue.status }}

    .detail(:class="isLoading ? '' : 'opacity-50' ")
      .detail-label.bigger-font Issue is raised
      .detail-box.mb-3
        .d-flex.flex-column
          .detail-value.smaller-font Issue Date
          .detail-value.bigger-font.secondary-text {{issue.issueDate}}

    .div.d-flex.flex-column(v-if="isLoading")
      v-progress-circular.mx-auto(color="primary" indeterminate)
      p.pt-3.secondary--text.text-center Loading customer sentiment result...

    .div(v-else)
      .detail(v-if="issue.status === 'Pending'")
        .detail-label.bigger-font Issue is pending
        .detail-box.mb-3
          .d-flex.flex-column
            .analysis
              .analysis-box.pa-2
                .d-flex
                  v-icon.primary--text mdi-robot
                  p.primary--text.mb-0.font-weight-medium.ml-2 Assigned Employee
                v-divider.my-2
                p.mb-0 Name: {{issue?.assignee?.name}}
                p.mb-0 Department: {{issue?.assignee?.department}}

                .d-flex.justify-center.pt-3
                  v-btn.text-capitalize.primary.rounded(@click="handleDialog()") Create Jira
                    v-icon(right dark) mdi-check-circle

      .detail(v-else)
        .detail-label.bigger-font Issue is assigned
        .detail-box.mb-3
          .d-flex.flex-column
            .analysis
              .analysis-box.pa-2
                .d-flex
                  v-icon.primary--text mdi-calendar-check
                  p.primary--text.mb-0.font-weight-medium.ml-2 Jira
                v-divider.my-2
                p.mb-0 Assigned Date: {{issue?.assignedDate}}
                p.mb-0 Jira ID: {{issue?.jiraId}}
                p.mb-0 Time left to solve the issue: {{issue?.deadline}}

                .d-flex.justify-center.pt-3
                  v-btn.text-capitalize.primary.rounded(@click="handleDialog()") View Jira Details
                    v-icon(right dark) mdi-eye-outline

      .detail(v-if="issue.status === 'Resolved'")
        .detail-label.bigger-font Issue is resolved
        .detail-box.mb-3
          .d-flex.flex-column
            .detail-value.smaller-font Resolved Date
            .detail-value.bigger-font.blue-text {{issue?.resolvedDate}}

  // Create Jira Dialog
  v-dialog(transition="dialog-bottom-transition", width="800" v-model="dialogVisible")
    v-card
      v-card.rounded-xl
        v-toolbar.px-4(elevation="0")
          h3.secondary--text.font-weight-medium Jira ID: {{issue?.jiraId}}
        v-card-text.pt-0.pb-8.px-8(color="black")
          .d-flex.justify-space-between.align-start
            .d-grid
              p.font-weight-medium.secondary--text.mb-0 {{issue?.subject || 'This is subject'}}
              p.body-2.mb-0 {{issue?.key_issue || 'This is key issue'}}
            v-chip.my-1(
              :color="getChipColor(issue?.status)"
              :textColor="getColor(issue?.status)"
              pill
            )
              p.mb-0 {{ issue?.status }}

          // Jira
          v-card.background2.pa-4.mt-4(elevation="0")
            v-icon.primary--text.mr-2 mdi-calendar-check
            span.body-2.font-weight-medium.py-2 Jira Details
            v-row.pb-2
              template(v-for="jira in jiraDetails")
                v-col(:cols="jira.col")
                  v-card.bg--background2.px-1.py-2.d-flex.rounded-lg(outlined)
                    v-icon.primary--text.pa-2(small) {{ jira.icon }}
                    .d-grid.pl-1
                      .caption.font-weight-light.darkGrey--text {{ jira.title }}
                      p.mb-0.mt-n1.body-2 {{ jira.value }}

          // Assignee
          v-card.background2.pa-4.mt-4(elevation="0")
            v-icon.primary--text.mr-2 mdi-account
            span.body-2.font-weight-medium.py-2 Asignee Details
            v-row.pb-2
              template(v-for="assignee in assignDetails")
                v-col(:cols="assignee.col")
                  v-card.bg--background2.px-1.py-2.d-flex.rounded-lg(outlined)
                    v-icon.primary--text.pa-2(small) {{ assignee.icon }}
                    .d-grid.pl-1
                      .caption.font-weight-light.darkGrey--text {{ assignee.title }}
                      p.mb-0.mt-n1.body-2 {{ assignee.value }}

        v-card-actions.justify-center.text-center.pb-3(v-if="issue.status === 'Pending'")
          v-btn.text-capitalize(rounded dark color="grey" @click="handleDialog()") Cancel
          v-btn.text-capitalize(rounded dark color="warning" @click="assignJira()") Create Jira

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoanRecommendation from '~/components/loan/LoanRecommendation.vue'

export default {
  components: {
    LoanRecommendation
  },
  props: {
    issue: null,
    isLoading: true,
    jiraDetails: null,
    assignDetails: null,
  },
  data () {
    return {
      dialogVisible: false,
      colors: [
        { name: 'Pending', color: '#1F9254', background: '#EBF9F1' },
        { name: 'In Progress', color: '#CD6200', background: '#FEF2E5' },
        { name: 'Resolved', color: '#314760', background: '#e9f7ff' },
      ]
    }
  },
  computed: {
    ...mapGetters({
      getIssueById: 'issue/getIssueById'
    })
  },
  methods: {
    ...mapActions({
      changeIssueStatus: 'issue/changeIssueStatus'
    }),
    getProgressBarColor (value) {
      const color = this.$vuetify.theme.themes.light.primary
      const opacity = (value) / 100 + 0.1 // Assuming value is between 0 and 100

      // Parse the color to get the RGB values
      const matches = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
      const r = parseInt(matches[1], 16)
      const g = parseInt(matches[2], 16)
      const b = parseInt(matches[3], 16)

      // Return the color with the adjusted opacity
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    },
    getColor (status) {
      const result = this.colors.find((c) => { return c.name === status })
      if (result) {
        return result.color
      } else {
        return this.$vuetify.theme.themes.primary
      }
    },
    getChipColor (status) {
      const result = this.colors.find((c) => { return c.name === status })
      if (result) {
        return result.background
      } else {
        return this.$vuetify.theme.themes.background
      }
    },
    handleDialog() {
      this.dialogVisible = !this.dialogVisible;
    },
    assignJira () {
      this.changeIssueStatus({ i: this.issue, s: 'To Progress' })
      this.handleDialog();
    },
    handleApprove () {
      // Handle approval logic
      console.log('Loan Approved')
      this.scrollToTop()
    }
  }
}
</script>

<style scoped>
:deep(.v-progress-linear) {
  border: solid 6px #d6dceb;
}

.wrapped-text {
  white-space: pre-wrap;
}

.primary-linear {
  background: linear-gradient(200deg, #FFD0CD 5.17%, #BB0000 49.42%, #9A0800 117.87%);
}

.title {
  font-size: 18px;
  font-weight: bold;
}

.processing {
  color: orange;
  border: 1px solid orange;
  border-radius: 5px;
  padding: 5px;
}
.approved {
  color: green;
  border: 1px solid green;
  border-radius: 5px;
  padding: 5px;
}
.rejected {
  color: red;
  border: 1px solid red;
  border-radius: 5px;
  padding: 5px;
}
.detail-box {
  border: 2px solid #333; /* Darker border */
  border-radius: 10px; /* Rounder corners */
  padding: 10px; /* Reduced padding */
}

.bg--background2 {
  background-color: #F2E7E7;
}

:deep(.v-progress-linear) {
  border: solid 6px #d6dceb;
}

.smaller-font {
  font-size: 14px;
  font-weight: normal;
}

.bigger-font {
  font-size: 16px;
  font-weight: bold;
}

.blue-text {
  color: #001f3f;
}

.opacity-50 {
  opacity: 0.4 !important;
}

.analysis-box {
  border: 2px dashed #333333; /* Darker border */
  border-radius: 12px; /* Rounder corners */
  background-color: #f9f4f4;
}

.percentage-bar {
  height: 10px;
  background-color: #001f3f; /* Green color */
  margin-top: 5px;
}

.conclusion {
  /* max-width: 300px; Set your desired maximum width */
  overflow: hidden; /* Optional: hide any content that overflows the box */
  justify-content: center;
  text-justify: auto;
}

.action-buttons {
  margin-top: 20px;
}

.reject-button {
  background-color: #ff0000; /* Red color */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

</style>

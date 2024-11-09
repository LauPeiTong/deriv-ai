<template lang="pug">
.issueList
  v-tabs(
    v-model="tab"
    align-with-title
  )
    v-tabs-slider(color="primary")
    v-tab.rounded-t-xl.text-capitalize(
      v-for="t in tabs"
      :key="t"
    ) {{ t }}

  v-card.shadow.pa-4.rounded-b-lg.rounded-tr-lg(elevation="0")
    v-tabs-items(v-model="tab")
      v-tab-item(
        v-for="l in list"
        :key="l.id"
      )
        //p.font-weight-medium {{ 'Customer Sentiments List' }}
        v-data-table.mt-18(
          :headers="headers"
          :items="l.table"
          multi-sort
          @click:row="onRowClick"
        )

            template(v-slot:body.prepend)
              tr
                td.py-4
                  v-text-field(v-model="id" type="number" label="ID" hide-details="auto" dense outlined)
                td.py-4
                  v-text-field(v-model="customerName" type="text" label="Customer Name" hide-details="auto" dense outlined)
                td.py-4
                  v-select.select-category(:items="levelList" label="Select a status" v-model="urgencyLevel" hide-details="auto" multiple chips dense outlined)
                    template(v-slot:selection="{ item, index }")
                      v-chip(small :color="getChipColor(item)" :textColor="getColor(item)")
                        span {{ item }}
                td.py-4
                  v-text-field(v-model="sentimentScore" type="number" label="More than" hide-details="auto" dense outlined)
                td.py-4
                  v-select.select-category(:items="statusList" label="Select a status" v-model="status" hide-details="auto" multiple chips dense outlined)
                    template(v-slot:selection="{ item, index }")
                      v-chip(small :color="getChipColor(item)" :textColor="getColor(item)")
                        span {{ item }}
                td.py-4
                  v-text-field(v-model="issue" type="text" label="Issue" hide-details="auto" dense outlined)
                td.py-4
                  v-text-field(v-model="issueDate" type="text" label="Date" hide-details="auto" dense outlined)
                td.py-4
                  v-text-field(v-model="assigneeName" type="text" label="Assignee Name" hide-details="auto" dense outlined)
                td.py-4
                  v-text-field(v-model="assigneeDepartment" type="text" label="Assignee Department" hide-details="auto" dense outlined)
                td.py-4.action-field
                td.py-4.action-field

            template(v-slot:item.id="{ item }")
              p.mb-0 {{ item.id }}

            template(v-slot:item.customerName="{ item }")
              .d-flex.align-center
                v-avatar.profile-pic(size="24")
                  span {{ getInitials(item.customer.name) }}
                span.ml-2.body-2 {{item.customer.name}}

            template(v-slot:item.urgencyLevel="{ item }")
              v-chip.my-1(
                :color="getChipColor(item.urgencyLevel)"
                :textColor="getColor(item.urgencyLevel)"
                pill
              )
                p.mb-0 {{ item.urgencyLevel }}

            template(v-slot:item.sentimentScore="{ item }")
              p.mb-0 {{ item.sentimentScore }}

            template(v-slot:item.status="{ item }")
              v-chip.my-1(
                :color="getChipColor(item.status)"
                :textColor="getColor(item.status)"
                pill
              )
                p.mb-0 {{ item.status }}

            template(v-slot:item.issue="{ item }")
              p.mb-0 {{ item.issue }}

            template(v-slot:item.issueDate="{ item }")
              p.mb-0 {{ item.issueDate }}

            template(v-slot:item.assigneeName="{ item }")
              p.mb-0 {{ item.assignee.name || '-' }}

            template(v-slot:item.assigneeDepartment="{ item }")
              p.mb-0 {{ item.assignee.department || '-' }}

            //- Placeholder
            template(v-slot:item.actions="{ item }")
              .d-flex.align-center.mt-4
                v-icon.white--text.mr-2 mdi-magnify
                v-icon.white--text mdi-pencil-box-outline

            template(v-slot:item.actions="{ item }")
              .d-flex.align-center.mt-3
                v-icon.primary--text.mr-2(@click="onRowClick(item)") mdi-magnify
                v-icon.primary--text(@click="") mdi-pencil-box-outline

            template(v-slot:footer.page-text)
              PaginateComp
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PaginateComp from './PaginateComp.vue'

export default {
  name: 'TableLayout',
  components: {
    PaginateComp
  },
  data () {
    return {
      tab: 'null',
      tabs: ['Customer Sentiments'],
      id: '',
      customerName: '',
      urgencyLevel: '',
      sentimentScore: '',
      status: '',
      issue: '',
      issueDate: '',
      assigneeName: '',
      assigneeDepartment: '',
      statusList: [
        'All',
        'Pending',
        'In Progress',
        'Resolved',
      ],
      levelList: [
        'All',
        'Low',
        'Medium',
        'High',
      ],
      colors: [
        { name: 'Pending', color: '#1F9254', background: '#EBF9F1' },
        { name: 'In Progress', color: '#CD6200', background: '#FEF2E5' },
        { name: 'Resolved', color: '#314760', background: '#e9f7ff' },
        { name: 'Low', color: '#1F9254', background: '#EBF9F1'},
        { name: 'Medium', color: '#CD6200', background: '#FEF2E5'},
        { name: 'High', color: '#BB0000', background: '#FBE7E8'},
      ],
      headers: [
        {
          text: 'ID',
          align: 'start',
          value: 'id',
          filter: (value) => {
            if (!this.id) { return true }
            return value === parseInt(this.id)
          }
        },
        {
          text: 'Customer Name',
          align: 'start',
          value: 'customerName',
          filter: (f) => { return (f + '').toLowerCase().includes(this.customerName.toLowerCase()) }
        },
        {
          text: 'Urgency Level',
          align: 'center',
          value: 'urgencyLevel',
          filter: (f) => {
            if (f !== '') {
              if (this.urgencyLevel.length === 0 || this.urgencyLevel.includes('All')) {
                return true
              }
              const result = this.urgencyLevel.filter(value => f.includes(value))
              if (result.length > 0) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
        },
        {
          text: 'Sentiment Score',
          align: 'center',
          value: 'sentimentScore',
          filter: (value) => {
            if (!this.sentimentScore) { return true }
            return value > parseInt(this.sentimentScore)
          }
        },
        {
          text: 'Status',
          align: 'center',
          sortable: false,
          value: 'status',
          filter: (f) => {
            if (f !== '') {
              if (this.status.length === 0 || this.status.includes('All')) {
                return true
              }
              const result = this.status.filter(value => f.includes(value))
              if (result.length > 0) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
        },
        {
          text: 'Issue',
          align: 'start',
          value: 'issue',
          filter: (f) => { return (f + '').toLowerCase().includes(this.issue.toLowerCase()) }
        },
        {
          text: 'Issue Date',
          align: 'center',
          value: 'issueDate',
          filter: (value) => {
            if (!this.issueDate) { return true }
            return value > parseInt(this.issueDate)
          }
        },
        {
          text: 'Assignee Name',
          align: 'start',
          value: 'assigneeName',
          filter: (f) => { return (f + '').toLowerCase().includes(this.assigneeName.toLowerCase()) }
        },
        {
          text: 'Assignee Department',
          align: 'start',
          value: 'assigneeDepartment',
          filter: (f) => { return (f + '').toLowerCase().includes(this.assigneeDepartment.toLowerCase()) }
        },
        { text: '', align: 'center', sortable: false, value: 'actions' },
        { text: 'Action', align: 'center', sortable: false, value: 'actions' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      list: 'issue/getList'
    })
  },
  methods: {
    ...mapActions({
      viewIssue: 'issue/viewIssue'
    }),
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
    onRowClick (item) {
      this.viewIssue(item)
      this.$router.push({ name: 'issue-id', params: { id: item.id, issue: item } })
    },
    getInitials(name) {
      return name
          .split(" ")           // Split by space (to handle multiple words)
          .map(word => word.slice(0, 1).toUpperCase())
          .slice(0, 2)
          .join("");            // Join them back together
    }
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
  background-color: #F2E7E7;
  color: #BB0000;
  padding: 0px 12px;
  margin-top: 8px !important;
}

.v-tab--active {
  background-color: #BB0000;
  color: white;
  padding: 0px 16px;
  margin-top: 4px !important;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.30) !important;
}

:deep(thead)  {
  background-color: #F2E7E7;
}

:deep(.v-data-table)  {
  overflow: auto !important;
  max-width: 100% !important;
}

:deep(.v-data-table td:nth-child(1)) {
  min-width: 100px;
}

:deep(.v-data-table td:nth-child(2)) {
  min-width: 220px;
}

:deep(.v-data-table td:nth-child(3)) {
  min-width: 150px;
}

:deep(.v-data-table td:nth-child(4)) {
  min-width: 150px;
}

:deep(.v-data-table td:nth-child(5)) {
  min-width: 150px;
}

:deep(.v-data-table td:nth-child(6)) {
  min-width: 300px;
}

:deep(.v-data-table td:nth-child(7)) {
  min-width: 150px;
}

:deep(.v-data-table td:nth-child(8)) {
  min-width: 220px;
}

:deep(.v-data-table td:nth-child(9)) {
  min-width: 220px;
}

:deep(.v-data-table td:last-child) {
  background-color: white;
  position: absolute !important;
  right: 0%;
  width: 88px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.12) !important;
}

:deep(thead th:last-child)  {
  background-color: #F2E7E7;
  position: absolute !important;
  right: 0%;
  width: 88px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.12) !important;
  padding-top: 12px !important;
}

:deep(.v-data-table td:nth-last-child(2),
thead th:nth-last-child(2)) {
  min-width: 88px;
}

.action-field {
  height: 20% !important;
  width: 88px;
}

.profile-pic {
  background-color: lightcoral;
  color: white;
}

:deep(.select-category .v-chip .v-chip__content) {
  font-size: 12px !important;
}

:deep(.select-category .v-chip .v-chip__content) {
  font-size: 12px !important;
}

:deep(.v-data-footer__icons-after) {
  display: none;
}

:deep(.v-data-footer__icons-before) {
  display: none;
}

:deep(.v-data-footer__pagination) {
  margin-right: 0px;
}

/* .dflex {
  display: flex !important;
}
.bg-primary {
  background-color: #BB0000 !important;
}

.bg-orange-50 {
  background-color: #fff7ed !important;
}
.text-orange-700 {
  color: #f97316 !important;
}
.h-70 {
  height: 70px;
}
.low {
  color: #666666;
}
.borderGray {
  border: 2px solid rgba(209, 213, 219, 1) !important;
}
.bg-inactive {
  background-color: #F2E7E7;
} */
</style>

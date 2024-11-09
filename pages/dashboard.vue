<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0.darkGrey2--text(:title="'Dashboard'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.primary")
  v-row.ma-0.pt-14.fill-width.px-2
    v-col.pb-6(cols="12")
      loan-summary-vue
    v-col(cols="4")
      v-card.fill-height.shadow.pa-3.py-2.rounded-lg(elevation="0")
        p.font-weight-medium Number of User Feedback
        ApexCharts(type="donut" :options="donutChartOptions" :series="series")
    v-col(cols="4")
      v-card.fill-height.shadow.pa-3.rounded-lg(elevation="0")
        p.font-weight-medium Feedback Category
        ApexCharts(type="bar" :options="barChartOptions" :series="series2" style="border: none;")
    v-col(cols="4")
      v-card.fill-height.shadow.pa-3.rounded-lg(elevation="0")
        p.font-weight-medium Top Comment Keywords
        div.rounded-lg(style=" min-height: 325px; max-height: 325px; overflow-y: auto;")
          v-card.px-4.py-2.mb-2(outlined)
            .d-flex.flex-no-wrap.justify-space-between
              .company
                .d-flex.flex-wrap.align-center
                  p.mb-1.text-h6.pr-2.primary--text Reddit
                  v-chip.chip-small.mb-1(
                    color="#FFD700"
                    outlined
                    pill
                  )
                    p.mb-0.caption #1
                p.mb-0 Keyword: User friendly
                p.mb-0.green--text 50

              v-avatar(
                class="ma-1"
                size="50"
                tile
              )
              //- v-img(:src="require(`../../assets/company/1.png`)")
          v-card.px-4.py-2.mb-2(outlined)
            .d-flex.flex-no-wrap.justify-space-between
              .company
                .d-flex.flex-wrap.align-center
                  p.mb-1.text-h6.pr-2.primary--text Instagram
                  v-chip.chip-small.mb-1(
                    color="#8A8A8A"
                    outlined
                    pill
                  )
                    p.mb-0.caption #2
                p.mb-0 Keyword: User friendly
                p.mb-0.green--text 50

              v-avatar(
                class="ma-1"
                size="50"
                tile
              )
              //- v-img(:src="require(`../../assets/company/1.png`)")
          v-card.px-4.py-2.mb-2(outlined)
            .d-flex.flex-no-wrap.justify-space-between
              .company
                .d-flex.flex-wrap.align-center
                  p.mb-1.text-h6.pr-2.primary--text X
                  v-chip.chip-small.mb-1(
                    color="#CD7F32"
                    outlined
                    pill
                  )
                    p.mb-0.caption #3
                p.mb-0 Keyword: User friendly
                p.mb-0.green--text 50

              v-avatar(
                class="ma-1"
                size="50"
                tile
              )
              //- v-img(:src="require(`../../assets/company/1.png`)")
          v-card.px-4.py-2.mb-2(outlined)
            .d-flex.flex-no-wrap.justify-space-between
              .company
                .d-flex.flex-wrap.align-center
                  p.mb-1.text-h6.pr-2.primary--text Xiao Hong Shu
                  v-chip.chip-small.mb-1(
                    color="#f95d6a"
                    outlined
                    pill
                  )
                    p.mb-0.caption #4
                p.mb-0 Keyword: User friendly
                p.mb-0.green--text 50

              v-avatar(
                class="ma-1"
                size="50"
                tile
              )
              //- v-img(:src="require(`../../assets/company/1.png`)")
    //- v-row
      v-card.rounded-xl.px-0.mb-4(outlined).flex
        v-card-text.d-flex
          //- apexchart(type="bar" height="350" width="500" :options="chartOptions" :series="series")
          //- apexchart(type="pie" height="350" width="600" :options="chartOptions1" :series="series1")
          //- apexchart(type="bar" height="400" width="300" :options="chartOptions2" :series="series2")
    //- v-row
      v-card.rounded-xl.px-0.mb-4(outlined).flex
        v-card-text.d-flex
          //- info-card(:value="totalBorrowers" title="Total Borrowers")
          //- info-card(:value="700" title="Average Credit Score of Borrowers")
          //- info-card(:value="160000" title="Average Size of Loans")
</template>

<script>
import { mapGetters } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import InfoCard from '@/components/InfoCard.vue'
import LoanSummaryVue from '~/components/dashboard/LoanSummary.vue'

export default {
  name: 'DashboardPage',
  components: {
    apexchart: VueApexCharts,
    InfoCard,
    LoanSummaryVue
  },
  layout: 'default',
  data () {
    return {
      totalBorrowers: 100,
      series: [20, 30, 15, 10, 30],
      series1: [40, 20, 25, 12, 3],
      donutChartOptions: {
        chart: {
          type: 'donut'
        },
        legend: {
          show: true
        },
        labels: ['Facebook', 'Reddit', 'XiaoHongShu', 'X', 'Instagram'],
        colors: ['#FF6F67', '#FF3F34', '#FF0F01', '#CD0B00', '#9A0800'],
        plotOptions: {
          pie: {
            expandOnClick: true,
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true,
                  color: '#333333',
                  fontSize: '20px',
                  fontWeight: '600',
                  formatter: function (value) {
                    const t = value.globals.series.reduce((a, b) => a + b, 0)
                    return t.toString() + ' loan'
                  }
                },
                value: {
                  color: '#bb0000',
                  fontSize: '25px',
                  fontWeight: '600'
                }
              }
            }
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              type: 'bar',
              width: 300
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        dataLabels: {
          enabled: false
        }
      },
      pieChartOptions: {
        labels: ['Penang', 'Kuala Lumpur', 'Johor', 'Selangor', 'Other States'],
        colors: ['#002147', '#004594', '#9197B8', '#848484', '#BB0000'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      },
      barChartOptions: {
        // Add your chart options here
        chart: {
          // id: 'apexchart-example',
          type: 'bar'
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: false
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#FF6F67', '#FF3F34', '#FF0F01', '#CD0B00', '#9A0800'],
        xaxis: {
          categories: ['User Experience', 'Customer Support', 'Platform Stability', 'Withdrawal Process', 'Education Resource']
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
                height: '100%'
              }
            }
          }
        ]
      },
      series2: [
        {
          name: 'Feedback Category',
          data: [
            { x: 'User Experience', y: 20, fillColor: '#FF6F67' },
            { x: 'Customer Support', y: 30, fillColor: '#FF3F34' },
            { x: 'Platform Stability', y: 15, fillColor: '#FF0F01' },
            { x: 'Withdrawal Process', y: 10, fillColor: '#CD0B00' },
            { x: 'Education Resource', y: 30, fillColor: '#9A0800' }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
  }
}
</script>

<style scoped>
.shadow {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>

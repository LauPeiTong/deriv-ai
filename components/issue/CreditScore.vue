<template lang="pug">
  .credit-score
    p.font-weight-medium Sentiment Score
    v-row
      v-col(cols="5")
        //- Meter
        v-card.fill-height.rounded-lg.py-2.px-3.mb-3(outlined)
          ApexCharts(type="radialBar" :options="chartOptions" :series="series")
          v-divider.my-2
          p.text-center.mb-0.primary--text.font-weight-medium Status
          h2.text-center.mb-4(:class="getCreditColor(issue.sentimentScore ?? 9)") {{ getCreditStatus(issue.sentimentScore ?? 9) }}

          //- Download document
          v-card.rounded-lg(outlined)
            v-card.px-1.py-2.d-flex.rounded-lg.background.border(elevation="0" @click="")
              v-icon.primary--text.pa-2(small) mdi-file-download
              .d-grid.pl-1
                p.mb-1.font-weight-medium.primary--textbody-2.text-decoration-underline CTOS Report
                p.mb-0.mt-n1.body-2.darkGrey--text Download Here

      //- Score percentage
      v-col(cols="7")
        v-card.fill-height.rounded-lg.pa-3(outlined)
          v-col.pb-1.px-2(style="height: 33.33%;")
            v-card.px-1.py-2.d-flex.rounded-lg.fill-height.align-center(outlined)
              v-icon.primary--text.pa-2.mr-2(large) mdi-alert-circle
              .d-grid.pl-1.darkGrey--text.header Key Issue
                p.mb-0.mt-n1.value.darkGrey2--text {{ issue.key_issue ?? '-' }}
          v-col.pb-1.px-2(style="height: 33.33%;")
            v-card.px-1.py-2.d-flex.rounded-lg.fill-height.align-center(outlined)
              v-icon.primary--text.pa-2.mr-2(large) mdi-lightbulb-on-outline
              .d-grid.pl-1.darkGrey--text.header Recommendation
                p.mb-0.mt-n1.value.darkGrey2--text {{ issue.recommendation.focus ?? '-' }}
          v-col.pb-1.px-2(style="height: 33.33%;")
            v-card.px-1.py-2.d-flex.rounded-lg.fill-height.align-center(outlined)
              v-icon.primary--text.pa-2.mr-2(large) mdi-cogs
              .d-grid.pl-1.darkGrey--text.header Suggested Features
                p.mb-0.mt-n1.value.darkGrey2--text {{ issue.recommendation.suggested_features ?? '-' }}

</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CreditScore',
  components: {
  },
  props: {
    issue: null
  },
  data () {
    return {
      series: null,
      chartOptions: null,
      creditScoreValue: [
        {
          name: 'Payment History (45%)',
          per: null
        },
        {
          name: 'Amount Owed (20%)',
          per: null
        },
        {
          name: 'Credit History Length (7%)',
          per: null
        },
        {
          name: 'Credit Mix (14%)',
          per: null
        },
        {
          name: 'New Credit (14%)',
          per: null
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
    })
  },

  created () {
    // console.log(this.$route.params)
    this.series = [((this.issue.sentimentScore ?? 90) / 100) * 100]
    // this.series = [((this.customer.creditScore ?? 750) / 850) * 100]
    this.creditScoreValue[0].per = this.issue.payment_history
    this.creditScoreValue[1].per = this.issue.amount_owed
    this.creditScoreValue[2].per = this.issue.credit_history_length
    this.creditScoreValue[3].per = this.issue.credit_mix
    this.creditScoreValue[4].per = this.issue.new_credit

    this.chartOptions = {
      chart: {
        type: 'radialBar',
        offsetY: -10,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
            margin: -20,
            image: require('../../assets/img/speedometer.svg'),
            imageWidth: 64,
            imageHeight: 64,
            imageClipped: false
          },
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#f9f4f4',
            strokeWidth: '70%',
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              color: '#c1c1c1',
              opacity: 0.5,
              blur: 1
            }
          },
          dataLabels: {
            name: {
              show: true,
              offsetY: -40,
              fontSize: '22px',
              color: '#BB0000'
            },
            value: {
              show: false
            }
          }
        }
      },
      grid: {
        padding: {
          top: -10
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          type: 'horizontal',
          shade: 'light',
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 10, 53, 91],
          colorStops: [
            {
              offset: -2.35,
              color: '#F52F62',
              opacity: 1
            },
            {
              offset: 60.52,
              color: '#4AA9F2',
              opacity: 1
            },
            {
              offset: 84.99,
              color: '#49CFB2',
              opacity: 1
            }
          ]
        }
      },
      labels: [(this.issue.sentimentScore ?? 9).toFixed(1)]
    }
  },
  methods: {
    getCreditStatus (score) {
      if (score >= 9) {
        return 'Excellent'
      } else if (score >= 7) {
        return 'Good'
      } else if (score >= 5) {
        return 'Above Average'
      } else if (score >= 3) {
        return 'Below Average'
      } else if (score >=  1) {
        return 'Weak'
      } else {
        return 'Very Weak'
      }
    },
    getCreditColor (score) {
      if (score >= 8) {
        return 'excellent--text'
      } else if (score >= 5) {
        return 'good--text'
      } else {
        return 'weak--text'
      }
    },
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
    }
  }
}
</script>

<style scoped>
:deep(.v-progress-linear) {
  border: solid 6px #d6dceb;
}

.header{
  font-size: 14px;
}

.value{
  font-size: 16px;
}
</style>

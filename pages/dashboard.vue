<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0.darkGrey2--text(:title="'Social Media Sentiment Analysis'" :icon="'analytics'" :rightIconColor="$vuetify.theme.themes.light.primary")

  // Loading overlay
  v-overlay(:value="loading")
    v-progress-circular(indeterminate size="64")

  v-row.ma-0.pt-14.fill-width.px-2(v-if="!loading")
    //- Meter
    v-card.fill-height.rounded-lg.py-2.px-3.mb-3(outlined)
      ApexCharts(type="radialBar" :options="meterChartOptions" :series="series")
      v-divider.my-2
      p.text-center.mb-0.primary--text.font-weight-medium Status
      h2.text-center.mb-4(:class="getCreditColor(analysisResults?.overall_average_sentiment_score * 100)") {{ analysisResults?.overall_sentiment_status }}

    v-col(cols="4")
      v-card.fill-height.shadow.pa-3.py-2.rounded-lg(elevation="0")
        p.font-weight-medium Platform Sentiment Distribution
        ApexCharts(
          type="donut"
          :options="donutChartOptions"
          :series="platformSentimentSeries"
        )

    v-col(cols="4")
      v-card.fill-height.shadow.pa-3.rounded-lg(elevation="0")
        p.font-weight-medium Feedback Categories
        ApexCharts(
          type="bar"
          :options="barChartOptions"
          :series="feedbackCategorySeries"
        )

    v-col(cols="4")
      v-card.fill-height.shadow.pa-3.rounded-lg(elevation="0")
        p.font-weight-medium Top Posts by Platform
        div.rounded-lg(style="min-height: 325px; max-height: 325px; overflow-y: auto;")
          v-card.px-4.py-2.mb-2(v-for="(platform, index) in ['Facebook', 'Reddit', 'Twitter']" :key="platform" outlined)
            .d-flex.flex-no-wrap.justify-space-between
              .company
                .d-flex.flex-wrap.align-center
                  p.mb-1.text-h6.pr-2.primary--text {{ platform }}
                  v-chip.chip-small.mb-1(
                    :color="getMedalColor(index)"
                    outlined
                    pill
                  )
                    p.mb-0.caption {{ index + 1 }}
                p.mb-0 {{ getTopPost(platform) }}
                p.mb-0(:class="getSentimentTextColor(platform)") {{ getPlatformSentiment(platform) }}
    v-col(cols="12")
      v-card.fill-height.shadow.pa-3.py-2.rounded-lg(elevation="0")
        ApexCharts(type="line" :options="lineChartOptions" :series="chartSeries" ref="chart")
</template>

<script>
import { mapGetters } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
import socialMediaData from '/store/social_media_data.json'
import { run } from '../store/genAI.js'
import InfoCard from '@/components/InfoCard.vue'
import LoanSummaryVue from '~/components/dashboard/LoanSummary.vue'

export default {
  name: 'SentimentDashboard',
  components: {
    ApexCharts: VueApexCharts
  },
  data() {
    return {
      loading: false,
      analysisResults: null,
      chartSeries: [{
        name: 'Data Series 1',
        data: []
      }],
      donutChartOptions: {
        chart: {
          type: 'donut'
        },
        legend: {
          show: true
        },
        labels: ['Facebook', 'Reddit', 'Twitter'],
        colors: ['#4267B2', '#FF4500', '#1DA1F2'],
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total Sentiment',
                  formatter: (w) => w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(2)
                }
              }
            }
          }
        },
        dataLabels: {
          enabled: true
        }
      },
      barChartOptions: {
        chart: {
          type: 'bar'
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#FF6F67'],
        xaxis: {
          categories: [
            'User Experience',
            'Customer Support',
            'Platform Stability',
            'Withdrawal Process',
            'Education Resource',
            'Others'
          ]
        }
      },
    }
  },
  computed: {
    ...mapGetters({
    }),
    platformSentimentSeries() {
      if (!this.analysisResults) return [0, 0, 0]
      return [
        this.analysisResults.facebook?.post_count || 0,
        this.analysisResults.reddit?.post_count || 0,
        this.analysisResults.twitter?.post_count || 0
      ]
    },
    feedbackCategorySeries() {
      if (!this.analysisResults?.feedback_categories) return [{
        name: 'Count',
        data: [0, 0, 0, 0, 0, 0]
      }]

      const categories = this.analysisResults.feedback_categories
      return [{
        name: 'Count',
        data: [
          categories['User Experience'] || 0,
          categories['Customer Support'] || 0,
          categories['Platform Stability'] || 0,
          categories['Withdrawal Process'] || 0,
          categories['Education Resource'] || 0,
          categories['Others'] || 0
        ]
      }]
    },
    series() {
    // Calculate series only if analysisResults and overall_average_sentiment_score are defined
    return this.analysisResults
      ? [((this.analysisResults.overall_average_sentiment_score || 0.75) / 0.85) * 100]
      : [0];
  },
  meterChartOptions() {
    return {
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
            image: require('../assets/img/speedometer.svg'),
            imageWidth: 64,
            imageHeight: 64,
            imageClipped: false
          },
          startAngle: -90,
          endAngle: 90,
          track: {
            background: '#f2f4f6',
            strokeWidth: '70%',
            margin: 5,
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
              color: '#002147'
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
      labels: [this.analysisResults?.overall_average_sentiment_score]
    };
  }
  },
  mounted () {
    const interval = (0);
    const chartSeries = [];
    const timeStamps = [];
    this.interval = setInterval(this.updateChartData, 3000); // Update every 1 second
    // this.updateChartData();
    this.analyzeSentiment();

  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed to prevent memory leaks
    clearInterval(this.interval);
  },
  watch: {
    // Watch for changes in chartSeries
    chartSeries(newValue, oldValue) {
      console.log('chartSeries changed:', this.$refs.chart);
    },
  },
  beforeDestroy() {
    // Clear the interval when the component is destroyed to prevent memory leaks
    clearInterval(this.interval);
  },
  methods: {
    generateMockData() {
      const now = new Date().getTime(); // Current timestamp
      const randomValue = Math.floor(Math.random() * 100); // Random value between 0-100
      return [now, randomValue];
    },

    // Function to update the chart data
    updateChartData() {
      const newData = this.generateMockData(); // Generate new mock data
      this.chartSeries[0].data.push(newData); // Add new data to chartSeries

      // Limit data length to the last 50 points
      if (this.chartSeries[0].data.length > 50) {
        this.chartSeries[0].data.shift(); // Remove the oldest data point
      }

      // Update the x-axis range dynamically to always show the last 1 minute of data
      const now = new Date().getTime();
      this.lineChartOptions.xaxis.max = now; // 1 minute ago
      this.lineChartOptions.xaxis.min = now  - 60 * 1000; // Set max to the latest data timestamp

      // this.$nextTick(() => {
      //   this.$refs.chart.updateSeries(this.chartSeries);
      // });
      this.$set(this.chartSeries[0].data, this.chartSeries[0].data.length, newData);
      this.$nextTick(() => {
        this.$refs.chart.updateOptions(this.lineChartOptions);
        this.$refs.chart.updateSeries(this.chartSeries);
      });
    },
    generatePrompt() {
      return `Analyze the sentiment in posts and comments from various social media platforms (Facebook, Reddit, Twitter) about Deriv.
        For each platform, determine whether the overall sentiment is positive, neutral, or negative, and calculate an average sentiment score between 0 and 1 (where 1 is most positive).
        Also, must categorize each post into one of the following categories based on its content:
        1. User Experience
        2. Customer Support
        3. Platform Stability
        4. Withdrawal Process
        5. Education Resource
        6. Others
        Finally, identify the top post with the highest engagement for each platform.
        The data you need to analyze is as follows:
        ${JSON.stringify(socialMediaData)}
        Provide the results in the following JSON format:
        {
          "facebook": {
            "average_sentiment_score": "Float",
            "sentiment_summary": "String (Positive, Neutral, Negative)",
            "top_post": "String (Top Facebook post based on engagement)",
            "post_count": "Integer (total number of Facebook posts)"
          },
          "reddit": {
            "average_sentiment_score": "Float",
            "sentiment_summary": "String (Positive, Neutral, Negative)",
            "top_post": "String (Top Reddit post based on engagement)",
            "post_count": "Integer (total number of Reddit posts)"
          },
          "twitter": {
            "average_sentiment_score": "Float",
            "sentiment_summary": "String (Positive, Neutral, Negative)",
            "top_post": "String (Top Twitter post based on engagement)",
            "post_count": "Integer (total number of Twitter posts)"
          },
          "overall_average_sentiment_score": "Float (average sentiment score across all platforms)",
          "overall_sentiment_status": "String (Positive, Neutral, Negative)",
          "feedback_categories": {
            "User Experience": "Integer (count of posts in this category)",
            "Customer Support": "Integer",
            "Platform Stability": "Integer",
            "Withdrawal Process": "Integer",
            "Education Resource": "Integer",
            "Others": "Integer"
          }
        }`
    },
    analyzeSentiment() {
      // try {
      //   this.loading = true
      //   const prompt = this.generatePrompt()
      //   const rawResponse = await run(prompt)
      //   this.analysisResults = JSON.parse(rawResponse)

      // } catch (error) {
      //   console.error('Error analyzing sentiment:', error)
      //   // Show error notification to user
      //   this.$notify({
      //     type: 'error',
      //     title: 'Error',
      //     text: 'Failed to analyze sentiment data. Please try again later.'
      //   })
      // } finally {
      //   this.loading = false

      // }
      this.loading = true
      const prompt = this.generatePrompt()

      run(prompt)
        .then(rawResponse => {
          this.analysisResults = JSON.parse(rawResponse);
          this.updateChartData();
        })
        .catch(error => {
          console.error('Error analyzing sentiment:', error)
          // Show error notification to user
          this.$notify({
            type: 'error',
            title: 'Error',
            text: 'Failed to analyze sentiment data. Please try again later.'
          })
        })
        .finally(() => {
          this.loading = false
        });
    },
    getSentimentColor(sentiment) {
      const colors = {
        Positive: 'success',
        Neutral: 'warning',
        Negative: 'error'
      }
      return colors[sentiment] || 'grey'
    },
    getSentimentTextColor(platform) {
      const sentiment = this.analysisResults?.[platform.toLowerCase()]?.sentiment_summary
      const colors = {
        Positive: 'green--text',
        Neutral: 'orange--text',
        Negative: 'red--text'
      }
      return colors[sentiment] || 'grey--text'
    },
    getMedalColor(index) {
      const colors = ['#FFD700', '#C0C0C0', '#CD7F32']
      return colors[index] || '#808080'
    },
    getTopPost(platform) {
      return this.analysisResults?.[platform.toLowerCase()]?.top_post || 'No data available'
    },
    getPlatformSentiment(platform) {
      const data = this.analysisResults?.[platform.toLowerCase()]
      if (!data) return 'No data'
      return `${data.sentiment_summary} (${(data.average_sentiment_score * 100).toFixed(1)}%)`
    },
    getCreditStatus (score) {
      if (score >= 66) {
        return 'Positive'
      } else if (score >= 33) {
        return 'Neutral'
      } else {
        return 'Negative'
      }
    },
    getCreditColor (score) {
      if (score >= 66) {
        return 'excellent--text'
      } else if (score >= 33) {
        return 'good--text'
      } else {
        return 'weak--text'
      }
    },
  },
  mounted() {
    this.analyzeSentiment()
  }
}
</script>

<style scoped>
.shadow {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>

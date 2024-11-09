<!-- <template lang="pug">
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
                  total: {
                    showAlways: true,
                    show: true,
                    color: '#333333',
                    fontSize: '20px',
                    fontWeight: '600',
                    formatter: function (value) {
                      const t = value.globals.series.reduce((a, b) => a + b, 0)
                      return t.toString() + ' users'
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
        barChartOptions: { // Add your chart options here
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
        lineChartOptions: {
          chart: {
            id: 'realtime',
            height: 350,
            type: 'line',
            animations: {
              enabled: true,
              easing: 'linear',
              dynamicAnimation: {
                speed: 1000
              }
            },
            toolbar: {
              show: false
            },
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          title: {
            text: 'Dynamic Updating Chart',
            align: 'left'
          },
          markers: {
            size: 0
          },
          xaxis: {
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            // title: {
            //   text: 'Month'
            // }
            type: 'datetime',
            // range: 10000
            max: new Date().getTime() - 60 * 1000, // 1 hour ago
            min: new Date().getTime(), // current time
            tickAmount: 5,
            labels: {
              show: true,
              format: 'dd MMM HH:mm'
            },
            
          },
          colors: ['#bb0000'],
          yaxis: {
            title: {
              text: 'Value'
            }
          },
          legend: {
            show: false
          }
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
    mounted() {
      const interval = (0);
      const chartSeries = [];
      const timeStamps = [];
      this.interval = setInterval(this.updateChartData, 3000); // Update every 1 second
      this.updateChartData();
      console.log("chartSeries", chartSeries)
    },
    beforeDestroy() {
      // Clear the interval when the component is destroyed to prevent memory leaks
      clearInterval(this.interval);
    },
    watch: {
      // Watch for changes in chartSeries
      chartSeries(newValue, oldValue) {
        console.log('chartSeries changed:', chartSeries);
      },
    },
    beforeDestroy() {
      clearInterval(this.interval); // Clear the interval when the component is destroyed
    },
    methods: {
      // Function to generate mock data (random values)
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
  
        this.$set(this.chartSeries[0].data, this.chartSeries[0].data.length, newData);
  
        // Update the x-axis range dynamically to always show the last 1 minute of data
        const now = new Date().getTime();
        this.lineChartOptions.xaxis.max = now; // 1 minute ago
        this.lineChartOptions.xaxis.min = now  - 60 * 1000; // Set max to the latest data timestamp
  
        // this.$nextTick(() => {
        //   this.$refs.chart.updateSeries(this.chartSeries);
        // });
  
        this.$nextTick(() => {
          this.$refs.chart.updateOptions(this.lineChartOptions); // Update the entire chart options
          this.$refs.chart.updateSeries(this.chartSeries); // Update the series data
        });
      }
    }
  }
}
</script>

<style scoped>
.shadow {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12) !important;
}
</style> -->


<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0.darkGrey2--text(:title="'Social Media Sentiment Analysis'" :icon="'analytics'" :rightIconColor="$vuetify.theme.themes.light.primary")

  // Loading overlay
  v-overlay(:value="loading")
    v-progress-circular(indeterminate size="64")

  v-row.ma-0.pt-14.fill-width.px-2(v-if="!loading")
    v-col.pb-6(cols="12")
      v-card.shadow.pa-4.rounded-lg(elevation="0")
        .d-flex.justify-space-between.align-center
          .text-h6 Overall Sentiment Score
          v-chip(:color="getSentimentColor(analysisResults?.overall_sentiment_status)" dark) {{ analysisResults?.overall_sentiment_status }}
        v-progress-linear.mt-2(
          :value="(analysisResults?.overall_average_sentiment_score || 0) * 100"
          :color="getSentimentColor(analysisResults?.overall_sentiment_status)"
          height="25"
        )
          template(v-slot:default)
            span.white--text {{ ((analysisResults?.overall_average_sentiment_score || 0) * 100).toFixed(1) }}%

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
import { run } from './genAI.js'
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
      lineChartOptions: {
        chart: {
          id: 'realtime',
          height: 350,
          type: 'line',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left'
        },
        markers: {
          size: 0
        },
        xaxis: {
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          // title: {
          //   text: 'Month'
          // }
          type: 'datetime',
          // range: 10000
          max: new Date().getTime() - 60 * 1000, // 1 hour ago
          min: new Date().getTime(), // current time
          tickAmount: 5,
          labels: {
            show: true,
            format: 'dd MMM HH:mm'
          },
          
        },
        colors: ['#bb0000'],
        yaxis: {
          title: {
            text: 'Value'
          }
        },
        legend: {
          show: false
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
        this.analysisResults.facebook?.average_sentiment_score * 100 || 0,
        this.analysisResults.reddit?.average_sentiment_score * 100 || 0,
        this.analysisResults.twitter?.average_sentiment_score * 100 || 0
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
            "top_post": "String (Top Facebook post based on engagement)"
          },
          "reddit": {
            "average_sentiment_score": "Float",
            "sentiment_summary": "String (Positive, Neutral, Negative)",
            "top_post": "String (Top Reddit post based on engagement)"
          },
          "twitter": {
            "average_sentiment_score": "Float",
            "sentiment_summary": "String (Positive, Neutral, Negative)",
            "top_post": "String (Top Twitter post based on engagement)"
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
    
  }
}
</script>

<style scoped>
.shadow {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>

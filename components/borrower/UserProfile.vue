<template lang="pug">
v-card.user-profile.shadow.pa-2.rounded-lg(elevation="0")
  v-img.rounded-lg(:src="require(`../../assets/img/background.png`)" height="150")
    .blurry.full-width

  .d-flex.mt-n14.px-4
    v-avatar.profile-pic(size="120")
      img.background(:src="require(`../../assets/${customer.id.startsWith('A') ? 'employee' : 'company'}/${customer.logo}.png`)" alt="John")
    .d-grid.pt-15.pl-4
      p.mb-0.text-h6 {{ customer.name }}
      p.mt-n1.body-2 Customer ID: {{ customer.id }}

  .px-4.pt-4.pb-5
    p.font-weight-medium.mb-1 Customer Details
    v-row
      template(v-for="item in basicData")
        v-col.pb-1.px-2(:cols="item.col")
          v-card.px-1.py-2.d-flex.rounded-lg(outlined)
            v-icon.primary--text.pa-2(small) {{ item.icon }}
            .d-grid.pl-1
              .caption.font-weight-light.darkGrey--text {{ item.title }}
              p.mb-0.mt-n1.body-2 {{ item.value }}
</template>

<script>
import { mapGetters } from 'vuex'
import { run } from './genAI.js'

// export default {
//   name: 'UserProfile',
//   data () {
//     return {
//       customer: null,
//       basicData: null
//     }
//   },
//   computed: {
//     ...mapGetters({
//       getCustomerById: 'customer/getCustomerById'
//     })
//   },
//   watch: {
//     $route (to, from) {
//       this.customer = to.params.customer
//     }
//   },
//   created () {
//     // console.log(this.$route.params)
//     this.customer = this.getCustomerById(this.$route.params.id)
//     this.basicData = [
//       {
//         col: 6,
//         icon: 'mdi-phone',
//         title: 'Phone Number',
//         value: this.customer.phone ?? '+6016-382 9423'
//       },
//       {
//         col: 6,
//         icon: 'mdi-email',
//         title: 'Email Address',
//         value: this.customer.email ?? 'raygan@gmail.com'
//       },
//       {
//         col: 6,
//         icon: 'mdi-card-account-details',
//         title: 'Gender',
//         value: this.customer.gender ?? 'Male'
//       },
//       {
//         col: 6,
//         icon: 'mdi-calendar-blank',
//         title: 'Trading Experience',
//         value: this.customer.tradingExperience ?? '3 years'
//       },
//       {
//         col: 6,
//         icon: 'mdi-account',
//         title: 'Age',
//         value: this.customer.age ?? '23'
//       },
//       {
//         col: 6,
//         icon: 'mdi-gender-male-female',
//         title: 'Location',
//         value: this.customer.location ?? 'Kuala Lumpur, Malaysia'
//       }
//     ]
//   }
// }
export default {
  data () {
    return {
      userData: {
        name: '',
        age: '',
        gender: '',
        location: '',
        tradingExperience: '',
        issue: '',
        sentimentScore: '',
        urgencyLevel: ''
      },
      promptText: '', // This is where the user enters the prompt
      response: '',
      formattedResponse: '' // This will store the formatted response (converted to JSON)
    }
  },
  methods: {
    // Method to send the prompt and get the AI response
    buildPrompt () {
      return `Based on the feedback from ${this.userData.name}, a ${this.userData.age}-year-old ${this.userData.gender} from ${this.userData.location} with ${this.userData.tradingExperience} trading experience, who has indicated that "${this.userData.issue}", it’s clear that the trading features require improvement. Given the sentiment score of ${this.userData.sentimentScore} and an urgency level of ${this.userData.urgencyLevel}, please recommend improvements. Provide the json format based on the below:
{
  "subject": "String. The subject line for the email, summarizing the recommendation or issue.",
  "assignee": "String. Generate out a person's Name as assignee",
  "department": "Name of department",
  "user_feedback": {
    "user": {
      "name": "String. The name of the user providing feedback.",
      "age": "Integer. Age of the user providing feedback.",
      "gender": "String. Gender of the user.",
      "location": "String. User’s location, typically the country or region.",
      "trading_experience": "String. The user’s experience level with trading (e.g., Beginner, Intermediate, Expert)."
    },
    "issue": "String. A brief description of the main issue or feedback provided by the user.",
    "urgency_level": "String. Urgency level of the feedback (e.g., Low, Medium, High)."
  },
  "key_issue": "String. A high-level summary of the main issue affecting user experience or satisfaction.",
  "recommendation": {
    "focus": "String. Primary recommendation or improvement focus based on the user’s feedback.",
    "suggested_features": [
      "Array of Strings. List of specific feature enhancements or changes recommended to address the issue."
    ]
  },
  "next_steps": [
    "Array of Strings. List of follow-up actions to be taken, including tasks prioritization for assignee, notifications to customers, and further assessments."
  ],
  "deadline": "Time taken to complete this ticket based on the urgency_level"
}`
    },
    async getAIResponse () {
      try {
        // Get the raw response from the AI
        const rawResponse = await run(this.buildPrompt())

        // Store the raw response for debugging purposes
        this.response = rawResponse

        // Format the response as JSON (if it is JSON)
        this.formatResponse(rawResponse)
      } catch (error) {
        console.error('Error getting AI response:', error)
      }
    },

    // Format the response to a structured sentence or object
    formatResponse (rawResponse) {
      try {
        const data = JSON.parse(rawResponse) // Convert JSON string to an object

        // Use the extracted data to format a readable response
        this.formattedResponse = `
          Subject: ${data.subject}
          Assignee: ${data.assignee}
          Department: ${data.department}
          User Feedback:
            Name: ${data.user_feedback.user.name}
            Age: ${data.user_feedback.user.age}
            Gender: ${data.user_feedback.user.gender}
            Location: ${data.user_feedback.user.location}
            Trading Experience: ${data.user_feedback.user.trading_experience}
          Key Issue: ${data.key_issue}
          Recommendation Focus: ${data.recommendation.focus}
          Suggested Features: ${data.recommendation.suggested_features.join(', ')}
          Next Steps: ${data.next_steps.join(', ')}
          Deadline: ${data.deadline}
        `
      } catch (error) {
        console.error('Error formatting the AI response:', error)
      }
    }
  }
}
</script>

<style scoped>
.blurry {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(25px);
}

.profile-pic {
  border: solid 4px white;
}
</style>

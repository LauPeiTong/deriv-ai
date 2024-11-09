<template lang="pug">
.dashboard-page.pa-0.ma-0.fill-width
  upper-title.ma-0(:title="'Customer Sentiments'" :icon="'bell'" :rightIconColor="$vuetify.theme.themes.light.primary")
  v-row.ma-0.pt-14.fill-width.px-2
    v-col(cols="12")
      .d-flex.align-center(id="top")
        v-btn.shadow.white(
          text
          icon
          color="primary"
          @click="goToList"
        )
          v-icon mdi-chevron-left
        .d-grid.pl-2
          p.secondary--text.mb-0 Customer Sentiment Information
          v-breadcrumbs.pa-0(:items="breadcrumbs")
    v-col(cols="8")
      user-profile-vue(:issue="issue")
      user-data-vue.pt-4(:issue="issue" :isLoading="isLoading")
    v-col(cols="4")
      issue-timeline(:is-loading="isLoading" :issue="issue" :jira-details="jiraDetails" :assignDetails="assignDetails")
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import UserProfileVue from '~/components/issue/UserProfile.vue'
import UserDataVue from '~/components/issue/UserData.vue'
import IssueTimeline from "../../components/issue/jira/IssueTimeline.vue";
import {run} from "../../store/genAI";

export default {
  name: 'IssueIdPage',
  components: {
    IssueTimeline,
    UserProfileVue,
    UserDataVue,
  },
  layout: 'default',
  data () {
    return {
      issue: null,
      isLoading: true,
      jiraDetails: null,
      assignDetails: null,
      breadcrumbs: [
        {
          text: 'Customer Sentiment List',
          disabled: false,
          href: 'borrower_list'
        }
      ],
      promptText: '', // This is where the user enters the prompt
      response: '',
      formattedResponse: '' // This will store the formatted response (converted to JSON)
    }
  },
  created () {
    this.getAIResponse();
  },
  computed: {
    ...mapGetters({
      getIssueById: 'issue/getIssueById'
    })
  },
  methods: {
    ...mapActions({
      updateIssueData: 'issue/updateIssueData'
    }),
    goToList () {
      this.$router.push('/issue')
    },
    // Method to send the prompt and get the AI response
    buildPrompt () {
      return `Based on the feedback from ${this.issue.name}, a ${this.issue.customer.age}-year-old ${this.issue.customer.gender} from ${this.issue.customer.location} with ${this.issue.customer.tradingExperience} trading experience, who has indicated that "${this.issue.issue}", it’s clear that the trading features require improvement. Given the sentiment score of ${this.issue.sentimentScore} and an urgency level of ${this.issue.urgencyLevel}, please recommend improvements. Provide the json format based on the below:
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
        this.issue = this.getIssueById(this.$route.params.id)
        // Get the raw response from the AI
        const rawResponse = await run(this.buildPrompt())

        // Store the raw response for debugging purposes
        this.response = rawResponse

        // Format the response as JSON (if it is JSON)
        this.formatResponse(rawResponse)
        this.getJiraDetails();
        this.getAssigneeDetails();
        this.isLoading = false;
      } catch (error) {
        console.error('Error getting AI response:', error)
      }
    },
    // Format the response to a structured sentence or object
    formatResponse (rawResponse) {
      try {
        const data = JSON.parse(rawResponse) // Convert JSON string to an object
        this.updateIssueData({ id: this.issue.id, res: data });

      } catch (error) {
        console.error('Error formatting the AI response:', error)
      }
    },
    getJiraDetails () {
      this.jiraDetails = [
        {
          col: 6,
          icon: 'mdi-link-variant',
          title: 'Jira ID',
          value: this.issue.jiraId
        },
        {
          col: 6,
          icon: 'mdi-account-circle',
          title: 'Issue Date',
          value: this.issue.issueDate
        },
        {
          col: 6,
          icon: 'mdi-account-circle',
          title: 'Urgency Level',
          value: this.issue.urgencyLevel
        },
        {
          col: 6,
          icon: 'mdi-account-circle',
          title: 'Deadline',
          value: this.issue.deadline
        },
      ]
    },
    getAssigneeDetails () {
      this.assignDetails = [
        {
          col: 6,
          icon: 'mdi-link-variant',
          title: 'Assignee Name',
          value: this.issue.assignee.name
        },
        {
          col: 6,
          icon: 'mdi-account-circle',
          title: 'Assginee Department',
          value: this.issue.assignee.department
        }
      ]
    }
  }
}
</script>

<style scoped>
.shadow {
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.12) !important;
}
</style>

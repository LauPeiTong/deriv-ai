<template>
  <div>
    <h2>AI Prompt Tester</h2>

    <h2>User Feedback Interface</h2>
    <label>
      Name:
      <input v-model="userData.name" placeholder="Enter user's name" />
    </label>
    <label>
      Age:
      <input type="number" v-model="userData.age" placeholder="Enter user's age" />
    </label>
    <label>
      Gender:
      <input v-model="userData.gender" placeholder="Enter user's gender" />
    </label>
    <label>
      Location:
      <input v-model="userData.location" placeholder="Enter user's location" />
    </label>
    <label>
      Trading Experience:
      <input v-model="userData.tradingExperience" placeholder="Enter trading experience level" />
    </label>
    <label>
      Issue:
      <textarea v-model="userData.issue" placeholder="Describe the issue"></textarea>
    </label>
    <label>
      Sentiment Score:
      <input type="number" v-model="userData.sentimentScore" placeholder="Enter sentiment score" step="0.1" />
    </label>
    <label>
      Urgency Level:
      <input v-model="userData.urgencyLevel" placeholder="Enter urgency level" />
    </label>
    <button @click="getAIResponse">Submit Prompt</button>

    <div v-if="response">
      <h3>AI Response</h3>
      <pre>{{ formattedResponse }}</pre>
    </div>
  </div>
</template>

<script>
// Import the run function from your genAI.js file
import { run } from '../store/genAI.js'

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
label {
  display: block;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}

h3 {
  margin-top: 20px;
}

pre {
  white-space: pre-wrap;
}
</style>

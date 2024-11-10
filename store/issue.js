export const state = () => ({
  issue: null,
  list: [
    {
      id: 1,
      table: [
        {
          "id": "A18932",
          "customer": {
            "name": "Nicholas Lee Wen Jie",
            "age": 29,
            "gender": "Male",
            "location": "Kuala Lumpur, Malaysia",
            "tradingExperience": "5 years",
            "phone": "+6016-800 1231",
            "email": "nicholas@gmail.com",
            "logo": 1
          },
          "issue": "UI glitch on dashboard",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.8,
          "urgencyLevel": "Low",
          "status": "Pending",
          "jiraId": "J12093",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        },
        {
          "id": "A18933",
          "customer": {
            "name": "Emma Tan Li Ying",
            "age": 32,
            "gender": "Female",
            "location": "Penang, Malaysia",
            "tradingExperience": "3 years",
            "phone": "+6016-800 5672",
            "email": "emma.tan@gmail.com",
            "logo": 2
          },
          "issue": "Delayed funds transfer",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.65,
          "urgencyLevel": "High",
          "status": "Pending",
          "jiraId": "",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        },
        {
          "id": "A18934",
          "customer": {
            "name": "John Lim Wei Sheng",
            "age": 41,
            "gender": "Male",
            "location": "Singapore",
            "tradingExperience": "10 years",
            "phone": "+6016-800 8754",
            "email": "john.lim@gmail.com",
            "logo": 3
          },
          "issue": "Trade execution delay",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.5,
          "urgencyLevel": "High",
          "status": "In Progress",
          "jiraId": "",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        },
        {
          "id": "A18942",
          "customer": {
            "name": "Afiq Iqmal Bin Mohd Zain",
            "age": 31,
            "gender": "Male",
            "location": "Kuala Lumpur, Malaysia",
            "tradingExperience": "4 years",
            "phone": "+6016-801 2211",
            "email": "afiq.iqmal@gmail.com",
            "logo": 11
          },
          "issue": "Account closure request",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.72,
          "urgencyLevel": "Medium",
          "status": "Pending",
          "jiraId": "",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        },
        {
          "id": "A18943",
          "customer": {
            "name": "Saraswathi Devi Rajah",
            "age": 40,
            "gender": "Female",
            "location": "Selangor, Malaysia",
            "tradingExperience": "10 years",
            "phone": "+6016-802 3322",
            "email": "saraswathi.devi@gmail.com",
            "logo": 12
          },
          "issue": "Deposit not reflected",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.65,
          "urgencyLevel": "High",
          "status": "In Progress",
          "jiraId": "",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        },
        {
          "id": "A18944",
          "customer": {
            "name": "Nur Aina Binti Yusof",
            "age": 28,
            "gender": "Female",
            "location": "Johor Bahru, Malaysia",
            "tradingExperience": "2 years",
            "phone": "+6016-803 4433",
            "email": "nur.aina@gmail.com",
            "logo": 13
          },
          "issue": "Password reset issue",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.9,
          "urgencyLevel": "Low",
          "status": "Resolved",
          "jiraId": "",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        },
        {
          "id": "A18945",
          "customer": {
            "name": "Vikram Singh Raj",
            "age": 37,
            "gender": "Male",
            "location": "Penang, Malaysia",
            "tradingExperience": "9 years",
            "phone": "+6016-804 5544",
            "email": "vikram.singh@gmail.com",
            "logo": 14
          },
          "issue": "Fee dispute",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.5,
          "urgencyLevel": "High",
          "status": "Pending",
          "jiraId": "",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        },
        {
          "id": "A18946",
          "customer": {
            "name": "Amirah Fatin Binti Abdul Rahman",
            "age": 26,
            "gender": "Female",
            "location": "Kuantan, Malaysia",
            "tradingExperience": "3 years",
            "phone": "+6016-805 6655",
            "email": "amirah.fatin@gmail.com",
            "logo": 15
          },
          "issue": "Account settings update",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.8,
          "urgencyLevel": "Medium",
          "status": "Pending",
          "jiraId": "",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        },
        {
          "id": "A18935",
          "customer": {
            "name": "Siti Noor Aisyah",
            "age": 27,
            "gender": "Female",
            "location": "Johor, Malaysia",
            "tradingExperience": "2 years",
            "phone": "+6016-800 4523",
            "email": "siti.noor@gmail.com",
            "logo": 4
          },
          "issue": "Tooltip error on charts",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.85,
          "urgencyLevel": "Low",
          "status": "Resolved",
          "jiraId": "",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        },
        {
          "id": "A18936",
          "customer": {
            "name": "Daniel Wong Chia Wei",
            "age": 35,
            "gender": "Male",
            "location": "Kuala Lumpur, Malaysia",
            "tradingExperience": "7 years",
            "phone": "+6016-800 7890",
            "email": "daniel.wong@gmail.com",
            "logo": 5
          },
          "issue": "Withdrawal limit increase request",
          "issueDate": "13/05/2022",
          "assignedDate": "",
          "actionDate": "",
          "subject": "",
          "key_issue": "",
          "sentimentScore": 0.9,
          "urgencyLevel": "Medium",
          "status": "Pending",
          "jiraId": "",
          "assignee": {
            "name": "",
            "department": ""
          },
          "recommendation": {
            "focus": "",
            "suggested_features": []
          },
          "next_steps": [],
          "deadline": "",
          "resolvedDate": ""
        }
      ]
    }
  ]
})

export const getters = {
  getIssue (state) {
    return state.issue
  },
  getList (state) {
    return state.list
  },
  getIssueById: state => (id) => {
    let l = state.list[0]
    return l.table.find(c => c.id === id)
  }
}

export const mutations = {
  updateIssue (state, issue) {
    state.issue = issue
    console.log(state.issue)
  },
  updateIssueStatus (state, { i: issue, s: status }) {
    let l = state.list[0];
    // console.log(l)
    const selectedIssue = l.table.find(c => c.id === issue.id)
    selectedIssue.status = status
  },
  updateAssignedDate (state, { i: issue, d: date }) {
    let l = state.list[0];
    const selectedIssue = l.table.find(c => c.id === issue.id)
    selectedIssue.assignedDate = date
  },
  updateIssueData (state, { id: issueId, res: response }) {
    let l = state.list[0];
    const selectedIssue = l.table.find(c => c.id === issueId);

    console.log(response)

    selectedIssue.subject = response.subject;
    selectedIssue.assignee = { name: response.assignee, department: response.department};
    selectedIssue.key_issue = response.key_issue;
    selectedIssue.recommendation = { focus: response.recommendation.focus, suggested_features: response.recommendation.suggested_features};
    selectedIssue.next_steps = response.next_steps;
    selectedIssue.deadline = response.deadline;
  }
}

export const actions = {
  viewIssue ({ commit }, issue) {
    commit('updateIssue', issue)
  },
  changeIssueStatus ({ commit }, { i: issue, s: status }) {
    commit('updateIssueStatus', { i: issue, s: status })
  },
  changeAssignedDate ({ commit }, { i: issue, d: date }) {
    commit('updateAssignedDate', { i: issue, d: date })
  },
  updateIssueData ({ commit }, { id: issueId, res: response }) {
    commit('updateIssueData', { id: issueId, res: response });
  }
}

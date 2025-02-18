# **Smart Onboarding Assistant**

Welcome to the **Smart Onboarding Assistant** repository! This project is an AI-powered tool designed to streamline and enhance the onboarding experience for new hires. By providing personalised guidance, contextual recommendations, and intelligent search capabilities, the **Smart Onboarding Assistant** ensures any new team members can quickly become productive and engaged.

---

## **AI-Powered Search Assistant**

The AI-powered Search Assistant is a natural language search tool that helps users quickly all relevant Jira issues assigned to them and hot Confluence pages shared with them.

_Features_:

- **Automated Retrieval** – Effortlessly pulls relevant Jira issues and Confluence pages based on user activity.
- **Enhanced Productivity** – Eliminates manual searching, allowing users to access important documentation and tasks instantly.
- **Real-Time Updates** – Ensures users always see the latest information for better decision-making.
- **Context-Aware Results**: The AI understands the context of Jeffrey’s role and current tasks, prioritizing results that are most relevant to his needs fingertips.

---

## **"What's Next?" Feature**

A daily task and learning recommendation system that suggests actionable goals based on the user’s progress. Examples include:

- "You haven’t explored the CI/CD pipeline documentation yet!"
- "Introduce yourself to the design team in the #design Slack channel."
- "Review the project roadmap for Q4 to understand team priorities."

This feature ensures new hires stay on track and feel a sense of accomplishment as they complete onboarding tasks.

---

## **InsightBot (Confluence Summariser)**

### **The Confluence Project Summariser** scans through all recently shared and commonly accessed projects of user’s, extracting key insights and eliminating the need to sift through lengthy documentation.

- **Real-Time Updates** – Always provides the latest information for accurate decision-making.
- **Boosts Productivity** – Saves time by delivering concise overviews of essential project details.
- **Seamless Integration** – Works within Confluence to enhance knowledge access and collaboration.
- **Smart Prioritization**: Highlights high-priority Jira tasks and their associated Confluence pages to help you focus on what matters most.

---

### The **Team Introduction** feature goes through all the introduction files in Confluence to give users the concise answer to “Who Everyone Is?” without having to look through the stack of endless project files

---

## **Getting Started**

### _Prerequisites_

- Have **Forge** and **npm** downloaded
- Have a **Jira** and **Cofluence** account
- Access to **Jira**, **Confluence**, and **Slack** APIs

---

### **Installation**

1. Clone the repository
   `git clone https://github.com/Sebastian-Zgheyb/OnboardingAssistant.git`

2. Run the following command
   `forge deploy`
   `forge install`

---

### **Usage**

#### For **Jira**:

1. Go to your Jira project.
2. Select the **Chat** button, click on the drop down.
3. In the drop down, look for your deployed Agent. If not, select **Browse Agents**.
4. Look for **Onboarding Assistant** by RovoBuddy.
5. Start asking the **Onboarding Assistant** any questions you have regarding the Onboarding process!

#### For **Confluence**:

1. At the top Confluence navigation bar, select the **Chat** button then click on the drop down.
2. In the drop down, look for your deployed Agent. If not, select **Browse Agents**.
3. Look for **Insight Bot** by RovoBuddy.
4. Start asking the **Insight Bot** any questions you have regarding the team and projects!

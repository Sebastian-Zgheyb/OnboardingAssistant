import api, { route } from "@forge/api";


export async function onboardingAssistant(event, context) {

  // Fetch completed issues by the user
  const completedIssues = await getCompletedIssues();

  // Fetch high-priority Jira tickets assigned to the user
  const nextIssues = await getHighPriorityIssues(2);

  // Generate an appreciation message
  const appreciationMessage = getAppreciationMessage(completedIssues.length);

  // Format the response
  const responseMessage = formatResponse(appreciationMessage, nextIssues);

  return responseMessage;
}

// Helper function to fetch completed issues
async function getCompletedIssues() {
  const response = await api.asApp().requestJira(route`/rest/api/3/search`, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
          jql: `status = "Done" ORDER BY updated DESC`,
          maxResults: 5
      })
  });

  const data = await response.json();
  return data.issues || [];
}

// Helper function to fetch high-priority issues
async function getHighPriorityIssues(limit) {
  const response = await api.asApp().requestJira(route`/rest/api/3/search`, {
      method: "POST",
      headers: { "Accept": "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
          jql: `status = "TO DO" AND description ~ "Priority: High" ORDER BY due ASC`,
          maxResults: limit
      })
  });

  const data = await response.json();
  return data.issues || [];
}

// Helper function to generate appreciation message
function getAppreciationMessage(completedCount) {
  if (completedCount === 0) return "You're off to a great start!";
  if (completedCount < 3) return `Great work! You've completed ${completedCount} tasks already.`;
  return `Awesome! You've completed ${completedCount} tasks. Keep up the momentum! 🚀`;
}

// Helper function to format response message
function formatResponse(appreciationMessage, issues) {
  let issueList = issues.map(issue => `- **${issue.fields.summary}**`).join("\n");

  return `${appreciationMessage}\n\nHere are your next high-priority tasks:\n${issueList}`;
}
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



//Marvin's part
export async function summaryAgentHandler(event) {
  const { pageId } = event; 
  console.log('pageId', pageId);
  console.log(JSON.stringify(event, null, 2));

  try {
    // Fetch the Confluence page content
    const response = await api.asApp().requestConfluence(route`/wiki/api/v2/pages/${pageId}?body-format=storage`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch page. Status code: ${response.status}`);
    }

    // Parse the page content
    const pageData = await response.json();
    console.log('Page data:', JSON.stringify(pageData, null, 2));

    // Extract pageBody from the response
    const pageBody = pageData.body;

    // Return the raw page body
    if (pageBody == undefined) {
      return "No content found for this page.";
    }

    return pageBody;  // Returning the page body without any summarization

  } catch (error) {
    console.error("Error fetching Confluence page:", error);
    return "Sorry, I couldn't fetch the page content. Please try again later.";
  }
}

export async function summaryAllAgentHandler(event) {
  const { pageId } = event; 
  console.log('pageId', pageId);
  console.log(JSON.stringify(event, null, 2));

  try {
    // Fetch the Confluence page content using Forge API.
    const response = await api.asApp().requestConfluence(route`/wiki/api/v2/pages/${pageId}?body-format=storage`, {
      headers: {
        Accept: "application/json",
      },
    });

  
    if (!response.ok) {
      throw new Error(`Failed to fetch page. Status code: ${response.status}`);
    }

    
    const pageData = await response.json(); 
    console.log('body', JSON.stringify(pageData, null, 2));
    const pageTitle = pageData.title;
    const pageBody = pageData.body;
    if (pageBody == undefined){
      return "No Summary found";
    }

    return pageBody;

  } catch (error) {
    console.error("Error summarizing project:", error);
    return "An error occurred while summarizing the project.";
  }
}

export async function fetchPages(){
  try {
    const response = await api.asApp().requestConfluence(route`/wiki/api/v2/pages`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pages. Status code: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching all Confluence pages:", error);
    return [];
  }
}

export async function fetchAllPages() {
  try {
    const response = await api.asApp().requestConfluence(route`/wiki/api/v2/pages`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch pages. Status code: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching all Confluence pages:", error);
    return [];
  }
}

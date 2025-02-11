import api, { route } from "@forge/api";

console.log("Script loaded! Waiting for function call...");

  export const fetchRecommendations = async (event, context) => {
    console.log("Function fetchRecommendations was triggered! ✅"); // Add this
    const userId = context.principal.accountId;
    try {
      console.log("Fetching Jira issues...");

      // Fetch Jira issues assigned to the current user
      const jiraResponse = await api.asApp().requestJira(route`/rest/api/3/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          jql: `assignee = "${userId}" ORDER BY priority DESC`,
          fields: ['summary', 'priority', 'status']
        })
      });

      console.log("API request sent... waiting for response..."); // Add this

      // Check if request was successful
      if (!jiraResponse.ok) {
        const errorText = await jiraResponse.text();
        console.error("Jira API request failed:", jiraResponse.status, errorText);
        return { error: `Jira API request failed: ${jiraResponse.status}` };
      }
      

      console.log("Jira API request successful! ✅");

      // Parse JSON response
      const jiraData = await jiraResponse.json();

      console.log("Jira Response:", JSON.stringify(jiraData, null, 2));

      // Extract issues and format response
      const jiraTickets = jiraData.issues?.map(issue => ({
        key: issue.key,
        summary: issue.fields.summary,
        priority: issue.fields.priority.name,
        status: issue.fields.status.name
      })) || [];

      console.log("Formatted Jira Tickets:", jiraTickets);

      return {
        jiraTickets,
      };

    } catch (error) {
      console.error("Error fetching recommendations:", error);
      return { error: error.message };
    }
  };





// const confluenceText = await confluenceResponse.text();
// console.log('Confluence Response:', confluenceText);
    // // Fetch relevant Confluence pages
    // const confluenceResponse = await api.asApp().requestConfluence(route`/wiki/rest/api/content/search?cql=type=page AND creator=currentUser() ORDER BY lastModified DESC`, {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json' // <== Ensure response is JSON
    //   }
    // });
    // const confluencePages = await confluenceResponse.json();

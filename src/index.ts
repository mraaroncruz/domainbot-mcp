import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const DOMAIN_BOT_URL = "https://domainbot.app/search";

const server = new McpServer({
  name: "Domainbot",
  version: "1.0.0",
});

// Define the search tool
server.tool(
  "search",
  {
    name: z.array(z.string()).describe("List of domain names to search"),
  },
  async ({ name }) => {
    try {
      // Join domain names with comma
      const nameString = name.join(",");

      // Make API call to domain bot
      const response = await fetch(`${DOMAIN_BOT_URL}?name=${nameString}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();

      return {
        content: [
          {
            type: "text",
            text: data,
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      return {
        content: [
          {
            type: "text",
            text: `Error: ${errorMessage}`,
          },
        ],
        isError: true,
      };
    }
  },
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Domainbot MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});

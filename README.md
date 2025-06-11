# Domainbot MCP Server

A Model Context Protocol (MCP) server that provides domain name availability search functionality through the Domainbot API.

## Features

- Search for multiple domain names at once
- Returns availability status and registration links
- Built with TypeScript and the official MCP SDK

## Installation

```bash
npm install
npm run build
```

## Usage

### As an MCP Server

```json
{
  "mcpServers": {
    "domainbot": {
      "command": "node",
      "args": ["/path/to/domainbot-mcp-ts/dist/index.js"]
    }
  }
}
```

Then restart Claude Desktop.

### Development

```bash
# Run with auto-reload
npm run dev

# Run TypeScript directly
npm run start:tsx

# Build and run
npm run build
npm start
```

## API

The server provides one tool:

### `search`

Search for domain name availability.

**Parameters:**

- `name` (string[]): List of domain names to search

**Example:**

```json
{
  "name": ["example.com", "test.org", "mysite.net"]
}
```

**Response:**
Returns JSON with availability status and registration links for each domain.

## License

ISC

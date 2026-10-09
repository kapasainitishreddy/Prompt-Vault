# Prompt-Vault MCP server (read-only)

Expose Prompt-Vault's 32 mobile UX patterns, 20 connected app journeys and 32 website sections to compatible coding agents through **Model Context Protocol v2**. Uses the official SDK packages, with no model credentials or paid API.

## Install and run

From the repository root:

    cd mcp
    npm install
    npm run check
    npm start

Node 20.19+ required. The server communicates by stdio, so stdout contains MCP protocol messages only.

## Configure a local MCP host

Most MCP hosts accept an entry like:

    {
      "mcpServers": {
        "prompt-vault": {
          "command": "node",
          "args": ["/absolute/path/to/Prompt-Vault/mcp/server.mjs"]
        }
      }
    }

Replace /absolute/path/to/Prompt-Vault with your actual clone path. A host may use a different configuration format; follow its current instructions. Dependencies must be installed within mcp first.

## Available tools

- search_app_patterns — find among the 32 flow specs
- get_app_pattern — get rationale and optional source prompt
- list_app_journeys — all 20 app categories and ordered screens
- get_app_journey — full linked screen journey
- compose_app_brief — deterministic build brief based on a selected journey
- search_website_sections — find among 32 website sections
- get_website_section — retrieve a website pattern, optionally with full prompt

Every tool is read-only and requires no API keys. compose_app_brief is a template composer, **not** an LLM inference endpoint. The server does not expose payment, account management, deployment, cloud storage or write actions.

## Validation boundary

Run an MCP client/inspector against this server after installing the SDK. This repository does not include an automated protocol conformance certificate or a hosted public MCP URL. The website and Native Kit are independent; do not confuse website browser previews with actual Expo builds.

Protocol and official SDK: https://ts.sdk.modelcontextprotocol.io/v2/

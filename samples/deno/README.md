# Deno Sample

This sample project shows how to handle webhooks from PageProof, securely, using Deno.

This project also contains the TypeScript [types for all of the currently supported webhook payloads](./src/webhook_models.ts).

## Running the sample

Run `deno task start` in this folder to start the server. It will listen on port 8000.

By default the signing secret is set to "your-signing-secret", and can be changed by editing the `.env` file.

You can use tools like ngrok or cloudflared to expose your local server to the internet, so that PageProof can send webhooks to it.

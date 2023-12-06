# Node.js Sample

This sample project shows how to handle webhooks from PageProof, securely, using Node.js.

## Running the sample

Ensure you have installed Node.js v20 or higher.

Run `npm install` to install the project's dependencies.

Then run `npm run start` in this folder to start the server. The server will listen on port 8000.

By default the signing secret is set to "your-signing-secret", and can be changed by editing the `.env` file.

You can use tools like ngrok or cloudflared to expose your local server to the internet, so that PageProof can send webhooks to it.

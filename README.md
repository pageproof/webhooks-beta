# PageProof Webhooks (beta)

This repository holds a collection of sample projects that demonstrate how to handle webhooks from PageProof, using best practices, and documentation aimed at developers looking at implementing webhooks.

## Quick links

- [TypeScript types for webhook payloads](./samples/deno/src/webhook_models.ts)
- [Node.js sample project](./samples/node_js/)
- [Deno sample project](./samples/deno/)
- [Known issues](./KNOWN_ISSUES.md)

## Managing webhooks

If you are a team administrator of your team, you can create/configure/archive/delete webhooks by clicking on your avatar in the app, then clicking on "Team", and then "Webhooks".

## Responding to webhooks

When a webhook is triggered, we will send an HTTP POST request to the URL you have configured for that webhook.

Respond with a 2xx HTTP status code to indicate that you have successfully received the webhook. If you respond with a 4xx or 5xx HTTP status code, PageProof will mark the delivery as a failure, and may attempt a redelivery at a later stage. Be aware that the beta does not currently retry failed deliveries.

## Securely verifying webhooks

Ensuring that webhooks you receive are actually from PageProof is important. If you do not use a signing secret, anybody who knows the URL of your webhook can send you fake webhooks (them: 🥸, you: 😭).

Each sample project in this repository contains code to securely verify that webhooks you receive have been sent from PageProof.

This is done by verifying the SHA-256 HMAC in the `x-pageproof-signature` header, we send you, using the signing secret that you provided when setting up your webhook.

Signing secrets are configured on a per-webhook basis. There is nothing stopping you from using the same secret across all your webhooks (for simplicity).

> [!IMPORTANT]
> Webhook signing secrets cannot be retrieved after they have been set. So make sure you keep them safe! You can, however, change them at any time.

You can see the sample implementations for verifying the signature here:

- [Node.js](./samples/node_js/src/isRequestSignedByPageProof.mjs)
- [Deno](./samples/deno/src/is_request_signed_by_pageproof.ts)

# Webhooks (beta) Known Issues

If you encounter any issues during the beta, please let us know by sending us a message via the in-app chat.

- The `proof_status_reached` event, when the proof status is `new`, contains partial data. The proof object may or may not include tags and integration references.

- Webhook delivery is not currently retried when a failure occurs. This feature will be added soon.

- The `proof_overdue` event currently triggers around 15 minutes before the proofs due date.

import { isRequestSignedByPageProof } from './is_request_signed_by_pageproof.ts';
import { Payload, EventType } from './webhook_models.ts';

Deno.serve(async (request) => {
  const isSigned = await isRequestSignedByPageProof(request.clone());

  if (!isSigned) {
    return Response.json({
      success: false,
      message: 'Request is not signed by PageProof.',
    }, {
      status: 403,
    });
  }

  const json: Payload<EventType.ProofStatusReached> = await request.json();
  console.log(json);

  return Response.json({ success: true });
});

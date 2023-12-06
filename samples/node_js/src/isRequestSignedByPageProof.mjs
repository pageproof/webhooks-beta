import { createHmac, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';

const WEBHOOK_SIGNING_SECRET = z.string().parse(process.env.WEBHOOK_SIGNING_SECRET);

/**
 * Returns whether the request can be trusted due it being signed by the signing secret you shared with PageProof.
 *
 * @param {{ headers: import('node:http').IncomingHttpHeaders, body: Buffer }} request
 * @returns {boolean}
 */
export async function isRequestSignedByPageProof(request) {
  const signature = request.headers['x-pageproof-signature'];

  if (typeof signature !== 'string') {
    return false;
  }

  const hmac = createHmac('sha256', WEBHOOK_SIGNING_SECRET)
    .update(request.body)
    .digest();

  try {
    return timingSafeEqual(
      Buffer.from(signature, 'hex'),
      hmac,
    );
  } catch {
    return false;
  }
}

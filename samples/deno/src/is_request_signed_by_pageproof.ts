import { decodeHex } from 'https://deno.land/std@0.208.0/encoding/hex.ts';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const WEBHOOK_SIGNING_SECRET = z.string().parse(Deno.env.get('WEBHOOK_SIGNING_SECRET'));

const signingKey = await crypto.subtle.importKey(
  'raw',
  new TextEncoder().encode(WEBHOOK_SIGNING_SECRET),
  { name: 'HMAC', hash: 'SHA-256' },
  false,
  ['verify'],
);

export async function isRequestSignedByPageProof(request: Request) {
  const signature = request.headers.get('x-pageproof-signature');

  if (signature === null) {
    return false;
  }

  const isValid = await crypto.subtle.verify(
    'HMAC',
    signingKey,
    decodeHex(signature),
    await request.arrayBuffer(),
  );

  return isValid;
}

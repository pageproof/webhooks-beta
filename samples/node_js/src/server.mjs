import { createServer } from 'node:http';
import { isRequestSignedByPageProof } from './isRequestSignedByPageProof.mjs';
import { readBody } from './readBody.mjs';
import { writeJsonResponse } from './writeJsonResponse.mjs';

const server = createServer(async (req, res) => {
  try {
    const body = await readBody(req);

    const isSigned = await isRequestSignedByPageProof({ headers: req.headers, body });
    if (!isSigned) {
      writeJsonResponse(res, { success: false, message: 'Request is not signed by PageProof.' }, 403);
      return;
    }

    const json = JSON.parse(body.toString('utf-8'));
    console.log(json);

    writeJsonResponse(res, { success: true });
  } catch (err) {
    if (res.headersSent) {
      res.end();
    } else {
      writeJsonResponse(res, { success: false, message: err.message }, 500);
    }
  }
});

server.listen(process.env.PORT, () => {
  console.log('Listening on http://localhost:8000');
});

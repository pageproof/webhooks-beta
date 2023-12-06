export function writeJsonResponse(res, body, statusCode = 200) {
  res.writeHead(statusCode, {
    'content-type': 'application/json',
  });
  res.end(JSON.stringify(body));
}

// Este archivo está deshabilitado para SSR (Server Side Rendering).
// Si deseas habilitar SSR, actualiza tu versión de Angular y ajusta el código correspondiente.

import express from 'express';
import { join } from 'node:path';

const app = express();
// const angularApp = new AngularNodeAppEngine();

/**
 * Serve static files from /browser
 */
app.use(
  express.static(join(import.meta.dirname, '../browser'), {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  // angularApp
  //   .handle(req)
  //   .then((response) =>
  //     response ? writeResponseToNodeResponse(response, res) : next(),
  //   )
  //   .catch(next);
});

// Example route
app.get('/', (req, res) => {
  res.send('Angular app running (SSR disabled)');
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// export const reqHandler = createNodeRequestHandler(app); // Handler SSR eliminado

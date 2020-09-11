import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as fs from 'fs';
// const fs = require('fs');
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/social-share/browser');
  const share = join(distFolder, 'assets/html/share');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const nonSPArouter = express.Router();
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  nonSPArouter.get('/', (req, res, next) => {
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const str = `<!doctype html>
    <html lang="en">
    <head>
        <title>Share html Ref</title>
      <meta charset="utf-8">
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content="${url}" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="${req.query.overrideTitle}" />
      <meta property="og:image" content="https://eventbox-prod.s3.amazonaws.com/profile/${req.query.overrideImage}" />
      <meta property="og:image:width" content="1279" />
      <meta property="og:image:height" content="853" />
      <meta property="og:description" content="${req.query.overrideDescription}" />
    </head>
    <body>
        Hello
      </body>
    </html>`;
    res.send(`
    ${str}
    `);
  });
  server.use((req, res, next) => {
    const ua = req.headers['user-agent'];
    if (/^(facebookexternalhit)|(Twitterbot)|(Pinterest)/gi.test(ua)) {
      console.log(req.query)
      if (req.query.overrideTitle && req.query.overrideDescription && req.query.overrideImage) {
        nonSPArouter(req, res, next);
      } else {
        next()
      }
    } else {
      next();
    }

  });
  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';

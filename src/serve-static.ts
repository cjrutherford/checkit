import { NextFunction, Request, Response } from 'express';
import { extname, join } from 'path';

import { NestExpressApplication } from '@nestjs/platform-express';

export function setupStatic(app: NestExpressApplication) {
  const publicDir = join(__dirname, '..', '..', 'public', 'browser');
  app.useStaticAssets(publicDir);
  app.setBaseViewsDir(publicDir);

  // Serve index.html for all non-API, non-static asset routes (deep linking support)
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.url.startsWith('/api')) {
      return next(); // Let API routes be handled by backend
    }
    // If the request matches a static file, let express.static handle it
    if (req.method === 'GET' && req.accepts('html') && !extname(req.url)) {
      return res.sendFile(join(publicDir, 'index.html'));
    }
    next();
  });
}

import { NestExpressApplication } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';

export function setupStatic(app: NestExpressApplication) {
  app.useStaticAssets(join(__dirname, '..', '..', 'client', 'dist', 'client', 'browser'));
  app.setBaseViewsDir(join(__dirname, '..', '..', 'client', 'dist', 'client', 'browser'));
  // Serve index.html for the root path
  app.getHttpAdapter().get('/', (req, res: Response) => {
    res.sendFile(join(__dirname, '..', '..', 'client', 'dist', 'client', 'browser', 'index.html'));
  });

  // Redirect all other paths to root
  // app.getHttpAdapter().get('*', (req, res: Response) => {
  //   res.redirect('/');
  // });
}

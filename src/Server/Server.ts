import { createServer, IncomingMessage, ServerResponse } from 'http';
import { Authorizer } from '../Authorization/Authorizer';
import { LoginHandler } from './LoginHandler';
import { Utils } from './Utils';

export class Server {
  private authorizer: Authorizer = new Authorizer();

  public createServer() {
    createServer(async (req: IncomingMessage, res: ServerResponse) => {
      console.log('Received request from ' + req.url);
      const basePath = Utils.getUrlBasePath(req.url);
      switch (basePath) {
        case 'login':
          await new LoginHandler(req, res, this.authorizer).handleRequest();
          break;
        default:
          break;
      }
      res.end();
    }).listen(8081);
    console.log('Server started at port 8081');
  }
}

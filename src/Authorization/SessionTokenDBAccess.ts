import * as Nedb from 'nedb';
import { SessionToken } from '../Server/Model';

export class SessionTokenDBAccess {
  private nedb: Nedb;

  public constructor() {
    this.nedb = new Nedb('database/sessionTokens.db');
    this.nedb.loadDatabase();
  }

  public async putSessionToken(token: SessionToken): Promise<void> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(token, (err: Error | null, docs: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
}

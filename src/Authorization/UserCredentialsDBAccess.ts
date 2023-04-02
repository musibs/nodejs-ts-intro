import { UserCredentials } from '../Shared/Model';
import * as nedb from 'nedb';

export class UserCredentialsDBAccess {
  private nedb: Nedb;

  public constructor() {
    this.nedb = new nedb('database/userCredentails.db');
    this.nedb.loadDatabase();
  }

  public async putUserCredentail(
    userCredentials: UserCredentials
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.nedb.insert(userCredentials, (err: Error | null, document: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(document);
        }
      });
    });
  }

  public async getUserCredential(
    username: string,
    password: string
  ): Promise<UserCredentials | undefined> {
    return new Promise((resolve, reject) => {
      this.nedb.find(
        { username: username, password: password },
        (err: Error, docs: UserCredentials[]) => {
          if (err) {
            reject(err);
          } else {
            if (docs.length == 0) {
              resolve(undefined);
            } else {
              resolve(docs[0]);
            }
          }
        }
      );
    });
  }
}

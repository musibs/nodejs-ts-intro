import { Account, SessionToken, TokenGenerator } from '../Server/Model';
import { SessionTokenDBAccess } from './SessionTokenDBAccess';
import { UserCredentialsDBAccess } from './UserCredentialsDBAccess';

export class Authorizer implements TokenGenerator {
  private userCredentialsDBAccess: UserCredentialsDBAccess =
    new UserCredentialsDBAccess();
  private sessionTokenDbAccess: SessionTokenDBAccess =
    new SessionTokenDBAccess();

  async generateToken(account: Account): Promise<SessionToken | undefined> {
    const resultAccount = await this.userCredentialsDBAccess.getUserCredential(
      account.username,
      account.password
    );

    if (resultAccount) {
      const token: SessionToken = {
        tokenId: Math.random().toString(36).slice(2),
        accessRights: resultAccount.accessRights,
        username: resultAccount.username,
        expirationTime: new Date(Date.now() + 60 * 5 * 1000),
        valid: true,
      };
      await this.sessionTokenDbAccess.putSessionToken(token);
      return token;
    } else {
      return undefined;
    }
  }
}

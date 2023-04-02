import { UserCredentialsDBAccess } from '../src/Authorization/UserCredentialsDBAccess';

class DBTest {
  public dbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
}

new DBTest().dbAccess.putUserCredentail({
  username: 'Som',
  password: 'pass',
  accessRights: [1, 2, 3],
});

import jwt from 'jsonwebtoken';
import congif from 'config';

export default class Token {

    readonly appPrivateKey: string = congif.get('appPrivateKey');
    readonly tokenDuration: string = congif.get('token.tokenDuration');

    public constructor() {
    }
  
    public signToken(username: string) {

        const payload = {
            username
        }        

        const signInOptions = {
            expiresIn: this.tokenDuration
        }

        return jwt.sign(payload, this.appPrivateKey, signInOptions);
    }

    public verifyToken(token: string) {

        return jwt.verify(token, this.appPrivateKey);
    }

  }
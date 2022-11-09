export class User {
   constructor(
      public email: string, 
      public id: string, 
      private _token: string, 
      private _tokenExpireDate: Date) {}

   get token(): string {
      if (!this._tokenExpireDate || this._tokenExpireDate > new Date()) { return null }
      return this._token;
   }
}
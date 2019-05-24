export default class Response {
  constructor(statusCode, code, message, payload = {}) {
    this._statusCode = statusCode;
    this._code = code;
    this._message = message;
    this._payload = payload;
  }
  get statusCode() {
    return this._statusCode;
  }
  get code() {
    return this._code;
  }
  get message() {
    return this._message;
  }
  get payload() {
    return this._payload;
  }

  get body(){
      return {
          code:this._code,
          message:this._message,
          payload:this._payload
      }
  }
  set statusCode(statusCode) {
    this._statusCode = statusCode;
  }
  set code(code) {
    this._code = code;
  }
  set message(message) {
    this._message = message;
  }
  set payload(payload) {
    this._payload = payload;
  }


}

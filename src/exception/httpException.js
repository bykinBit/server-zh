class HttpException extends Error {
  constructor(status, message, error) {
    super(message);
  }
}
export default HttpException;

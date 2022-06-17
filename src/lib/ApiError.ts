export class ApiError extends Error {
  constructor(message = 'API error', public code: number = 400, ) {
    super(message);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
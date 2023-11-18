import { ApplicationError } from "./application-error";

export class HttpError extends ApplicationError {
  constructor(message: string, public readonly statusCode: number) {
    super(message);
  }
}

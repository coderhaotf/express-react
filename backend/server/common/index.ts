export class CommonError extends Error {
  public status: number | undefined;
  public code: string | undefined;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    Object.setPrototypeOf(this, CommonError.prototype);
    this.status = status;
    this.code = code;
  }
}

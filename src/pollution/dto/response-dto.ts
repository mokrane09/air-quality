export class SuccessResponseDto {
  private Result: any;

  constructor(data) {
    this.Result = data;
  }
}

export class ErrorResponseDto {
  private message: string;

  constructor(message) {
    this.message = message;
  }
}

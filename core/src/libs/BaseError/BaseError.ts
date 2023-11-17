export interface BaseErrorUserMessage {
  title: string;
  messages: string[];
}

export abstract class BaseError extends Error {
  public readonly id: string;
  public readonly time: Date;
  public readonly name: string;
  public readonly message: string;

  public readonly userMessage?: BaseErrorUserMessage;

  protected constructor(name: string, message: string, userMessage?: BaseErrorUserMessage) {
    super(message);

    this.id = Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(2, 10);
    this.name = name;
    this.message = message;
    this.userMessage = userMessage;
    this.time = new Date();
  }
}

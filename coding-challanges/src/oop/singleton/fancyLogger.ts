class FancyLogger {
  logs: string[] = [];
  private static instance: FancyLogger;

  constructor() {
    if (!FancyLogger.instance) {
      FancyLogger.instance = this;
    }
    return FancyLogger.instance;
  }
  static getInstance() {
    if (!FancyLogger.instance) {
      FancyLogger.instance = new FancyLogger();
    }
    return FancyLogger.instance;
  }

  log(message: string) {
    this.logs.push(message);
    console.log(`Fancy: ${message}`);
  }

  printLogCount() {
    console.log(`${this.logs.length} Logs`);
  }
}

export const logger = Object.freeze(new FancyLogger());

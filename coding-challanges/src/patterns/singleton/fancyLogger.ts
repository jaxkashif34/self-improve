/*
The Singleton Pattern is a design pattern that ensures a class has only one instance and 
provides a global point of access to that instance. This is useful when a single object 
is needed to coordinate actions across the system, like managing shared resources or 
maintaining state. The class typically prevents external instantiation by making its 
constructor private and offers a static method to get the instance. This way, whenever 
the instance is needed, the same one is returned, ensuring consistency throughout the 
application. It helps in saving memory and ensuring controlled access to resources.
*/ 

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

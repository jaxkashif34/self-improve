import { logger } from './fancyLogger';

export const logSecondImplementation = () => {
  logger.printLogCount();
  logger.log('Second File');
  logger.printLogCount();
};

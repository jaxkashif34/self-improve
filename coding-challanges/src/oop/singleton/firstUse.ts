import { logger } from './fancyLogger';

export const logFirstImplementation = () => {
  logger.printLogCount();
  logger.log('First File');
  logger.printLogCount();
};

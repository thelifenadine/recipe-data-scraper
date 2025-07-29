const isLoggingEnabled: boolean = process.env.LOGGING_ENABLED === 'true';

const logger = (...args: any[]): void => {
  if (isLoggingEnabled) {
    console.log(...args);
  }
};

export default logger; 
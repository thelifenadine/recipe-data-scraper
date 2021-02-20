const isLoggingEnabled = process.env.LOGGING_ENABLED === 'true';

const logger = (...args) => {
  if (isLoggingEnabled) {
    console.log(...args);
  }
};

export default logger;

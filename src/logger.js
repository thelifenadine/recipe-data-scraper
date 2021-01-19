import config from '../config.json';

const logger = (...args) => {
  if (config.loggingEnabled) {
    console.log(...args);
  }
};

export default logger;

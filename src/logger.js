const loggingEnabled = true; // TODO: move to env file

const logger = (...args) => {
  if (loggingEnabled) {
    console.log(...args);
  }
};

export default logger;

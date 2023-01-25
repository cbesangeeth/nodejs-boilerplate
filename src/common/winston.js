const zipkin = require('zipkin');
const CLSContext = require('zipkin-context-cls');
const { basename } = require('path');

const ctxImpl = new CLSContext(); // if you want to use CLS(continuation-local-storage)

const { format, createLogger, transports } = require('winston');
const config = require('../config');

const { combine, timestamp, printf } = format;
const { Console } = transports;

let fileName;

const tracer = new zipkin.Tracer({
  ctxImpl, // the in-process context
  recorder: new zipkin.ConsoleRecorder(), // For easy debugging.
  sampler: new zipkin.sampler.CountingSampler(0.01), // sample rate 0.01 will sample 1 % of all incoming requests
  traceId128Bit: true, // to generate 128-bit trace IDs. 64-bit (false) is default
  localServiceName: config.appName, // name of this application //config.appName
});

const errorStackTracerFormat = format(info => {
  const updateInfo = info;
  if (info.meta && info.meta instanceof Error) {
    updateInfo.message = `${info.message} ${info.meta.stack}`;
  }
  return updateInfo;
});

const winstonLog = createLogger({
  format: combine(
    format.splat(),
    timestamp({ format: 'HH:mm:ss:ms' }),
    errorStackTracerFormat(),
    printf(info => {
      const out = {
        level: info.level,
        time: info.timestamp,
        message: info.message,
        traceId: `${tracer.id.traceId}'`,
        file: `${basename(fileName)}'`,
      };
      return JSON.stringify(out);
    }),
  ),
  transports: [new Console({ level: 'debug' })],
});

class Logger {
  constructor(path) {
    this.path = path;
  }

  error(message, error) {
    fileName = this.path;
    winstonLog.error(message, error);
  }

  info(message) {
    fileName = this.path;
    winstonLog.info(message);
  }

  debug(message) {
    fileName = this.path;
    winstonLog.debug(message);
  }

  warn(message) {
    fileName = this.path;
    winstonLog.warn(message);
  }
}

exports.Logger = Logger;

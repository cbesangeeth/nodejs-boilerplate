const winston = require("winston");
const zipkin = require("zipkin");
const CLSContext = require("zipkin-context-cls");

const ctxImpl = new CLSContext(); // if you want to use CLS(continuation-local-storage)
const config = require("../config");

let requestIp;
let originalUrl;
let method;
let userId;
let fileName;

const tracer = new zipkin.Tracer({
  ctxImpl, // the in-process context
  recorder: new zipkin.ConsoleRecorder(), // For easy debugging.
  sampler: new zipkin.sampler.CountingSampler(0.01), // sample rate 0.01 will sample 1 % of all incoming requests
  traceId128Bit: true, // to generate 128-bit trace IDs. 64-bit (false) is default
  localServiceName: config.appname, // name of this application //config.appname
});

class Logger {
  constructor(path) {
    this.path = path;
  }

  error(message, request) {
    if (request) {
      extractReqInfo(request);
    }
    fileName = this.path;
    winstonLog.error(message);
  }

  info(message, request) {
    if (request) {
      extractReqInfo(request);
    }
    fileName = this.path;
    winstonLog.info(message);
  }

  debug(message, request) {
    if (request) {
      extractReqInfo(request);
    }
    fileName = this.path;
    winstonLog.debug(message);
  }

  warn(message, request) {
    if (request) {
      extractReqInfo(request);
    }
    fileName = this.path;
    winstonLog.warn(message);
  }
}

const winstonLog = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "HH:mm:ss:ms" }),
    winston.format.printf((info) => {
      const out = `${info.timestamp} ${fileName} ${info.level}  ${info.message} ${userId} ${requestIp} ${originalUrl} ${method} ${tracer._sentinelTraceId.traceId}:${tracer._sentinelTraceId.spanId}:${tracer._sentinelTraceId.parentSpanId}`;
      console.log("----------LOG_LEVEL---------", config.log.level);
      if (config.log.level && config.log.level.includes(info.level)) {
        return out;
      }
    })
  ),
  transports: [new winston.transports.Console({ level: "debug" })],
});

const extractReqInfo = async (request) => {
  requestIp = (request.headers["x-forwarded-for"] || "127.0.0.1").split(",", 1);
  originalUrl = request.originalUrl;
  method = request.method;
  if (request.headers.authorization) {
    userId = request.headers.requestMeta
      ? request.headers.requestMeta.user_id
      : null;
  }
};

exports.Logger = Logger;

import { Logger } from 'tslog';

/**
 * Provides powerful, fast and expressive logging for Node.js.
 *
 * Available log levels are:
 *
 * 0: silly
 * 1: trace
 * 2: debug
 * 3: info
 * 4: warn
 * 5: error
 * 6: fatal
 *
 * @remarks
 * Log level trace behaves a bit differently compared to all the other log
 * levels. While it is possible to activate a stack trace for every
 * log level, it is already activated for trace by default.
 * That means every trace log will also automatically capture
 * and print its entire stack trace.
 */
export const log: Logger = new Logger({ name: 'JTracer ACS' });

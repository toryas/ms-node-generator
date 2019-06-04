import log4js from 'log4js';

export function getLogger(name) {
    log4js.configure({
        appenders: { 'out': { type: 'stdout' } },
        categories: { default: { appenders: ['out'], level: 'trace' } }
    });
    return log4js.getLogger(name);
}
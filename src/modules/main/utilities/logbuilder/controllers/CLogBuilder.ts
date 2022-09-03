import * as winston from "winston"

/**
 * A class representing the logger controller
 *
 * @author  Devitrax
 * @version 1.0, 03/08/22
 */
const CLogBuilder = winston.createLogger({
	level: 'info',
	transports: [
		new winston.transports.File({
			handleExceptions: true,
			filename: `./log/bot.log`,
			format: winston.format.simple()
		}),
		new winston.transports.Console({
			handleExceptions: true,
			// colorize: true,
			format: winston.format.combine(
				winston.format.colorize({
					all: true
				}),
				winston.format.timestamp({
					format: "YY-MM-DD HH:MM:SS"
				}),
				winston.format.printf(({ level, message, timestamp }) => {
					return `(${timestamp}) [${level}]: ${message}`
				})
			),
		}),
	],
})

export default CLogBuilder
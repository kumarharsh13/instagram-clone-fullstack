const chalk = require("chalk");
const morgan = require("morgan");

// ── SQL query logger ──────────────────────────────────────────────────────────

const sqlLogger = (sql) => {
  const query = sql.replace(/^Executing \(default\):\s*/i, "").trim();
  const upper = query.toUpperCase();
  let colored;
  if (upper.startsWith("SELECT")) colored = chalk.blue(query);
  else if (upper.startsWith("INSERT")) colored = chalk.green(query);
  else if (upper.startsWith("UPDATE")) colored = chalk.yellow(query);
  else if (upper.startsWith("DELETE")) colored = chalk.red(query);
  else colored = chalk.gray(query);
  console.log(`${chalk.gray("[")}${chalk.bold("SQL")}${chalk.gray("]")} ${colored}`);
};

// ── HTTP request logger (morgan middleware) ───────────────────────────────────

const statusColor = (status) => {
  if (status >= 500) return chalk.red.bold(status);
  if (status >= 400) return chalk.yellow.bold(status);
  if (status >= 300) return chalk.cyan(status);
  return chalk.green.bold(status);
};

const methodColor = (method) => {
  const colors = {
    GET: chalk.blue.bold,
    POST: chalk.magenta.bold,
    PUT: chalk.yellow.bold,
    PATCH: chalk.yellow.bold,
    DELETE: chalk.red.bold,
  };
  return (colors[method] || chalk.white)(method.padEnd(6));
};

morgan.token("colored-status", (req, res) => statusColor(res.statusCode));
morgan.token("colored-method", (req) => methodColor(req.method));
morgan.token("colored-url", (req) => chalk.white(req.originalUrl));
morgan.token("colored-time", (req, res, digits) => {
  const ms = morgan["response-time"](req, res, digits);
  const n = parseFloat(ms);
  const colored = n > 500 ? chalk.red(ms) : n > 100 ? chalk.yellow(ms) : chalk.green(ms);
  return `${colored} ms`;
});

const httpLogger = morgan(
  `${chalk.gray("[")}${chalk.bold("SERVER")}${chalk.gray("]")} :colored-method :colored-url ${chalk.gray("→")} :colored-status :colored-time`
);

// ── Server lifecycle messages ─────────────────────────────────────────────────

const log = {
  serverStart: (port) =>
    console.log(
      `${chalk.gray("[")}${chalk.green.bold("SERVER")}${chalk.gray("]")} Running on ${chalk.cyan.underline(`http://localhost:${port}`)}`
    ),
  serverShutdown: () =>
    console.log(chalk.yellow.bold("\n[SERVER] Shutting down gracefully...")),
  serverClosed: () =>
    console.log(chalk.green("[SERVER] HTTP server closed.")),
  serverForceExit: () =>
    console.error(chalk.red.bold("[SERVER] Forced shutdown after timeout.")),
  dbConnected: () =>
    console.log(`${chalk.gray("[")}${chalk.green.bold("DB")}${chalk.gray("]")} PostgreSQL connected`),
  dbError: (err) =>
    console.error(`${chalk.gray("[")}${chalk.red.bold("DB")}${chalk.gray("]")} Connection failed:`, err),
};

module.exports = { sqlLogger, httpLogger, log };

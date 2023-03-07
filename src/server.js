import http from 'node:http';
import chalk from '../fake_modules/fake_chalk.js';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { Database } from './database.js';

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.database = database;
    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res
    .writeHead(404)
    .end(JSON.stringify({ error: 'This route does not exist' }));
});

server.listen(3333, () => {
  console.clear();
  console.log(chalk.blue('---------------------------'));
  console.log(chalk.blue('SERVER INFO'));
  console.log(chalk.blue('---------------------------'));
  console.log(chalk.white('Status:'), chalk.green('online'));
  console.log(chalk.white('Port:'), chalk.gray('3333'));
  console.log(chalk.white('Host:'), chalk.gray('localhost'));
  console.log(chalk.white('Protocol:'), chalk.gray('http'));
  console.log(chalk.white('URL:'), chalk.url('http://localhost:3333'));

  console.log(chalk.blue('---------------------------\n'));
});
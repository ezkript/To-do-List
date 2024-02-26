import Fastify from 'fastify'
import "dotenv/config";
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import listRoutes from './routes/list.routes.js';

import { db }  from './utils/db.js';
import taskRoutes from './routes/task.routes.js';
db();
const fastify = Fastify({
  logger: true,
});


fastify.register(
  function(auth, _, done) {
    authRoutes.forEach((route) => {
      auth.route(route);
    });
    
    done();
  },
  { prefix: '/api/auth' }
);

fastify.register(
  function(user, _, done) {
    userRoutes.forEach((route)=> {
      user.route(route);
    });
    
    done();
  },
  { prefix: '/api/user' }
);

fastify.register(
  function(list, _, done) {
    listRoutes.forEach((route)=> {
      list.route(route);
    });
    
    done();
  },
  { prefix: '/api/list' }
);

fastify.register(
  function(task, _, done) {
    taskRoutes.forEach((route)=> {
      task.route(route);
    });
    
    done();
  },
  { prefix: '/api/task' }
);

fastify.listen({ port: process.env.PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  };

  fastify.log.info(`server started on port ${address}`);
})
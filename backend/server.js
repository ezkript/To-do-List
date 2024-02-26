import Fastify from 'fastify'
import "dotenv/config";
import authRoutes from './routes/auth.routes.js';
import { db }  from './utils/db.js';
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

fastify.listen({ port: process.env.PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  };

  fastify.log.info(`server started on port ${address}`);
})
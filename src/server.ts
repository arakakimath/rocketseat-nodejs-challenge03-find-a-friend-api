import { app } from './app'
import { env } from '@/env'

app.get('/', () => 'Hello world!')

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server Running!')
  })

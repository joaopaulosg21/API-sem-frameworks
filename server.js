require('./.env')
const http = require('http');
const routes = require('./routes/routes')

http.createServer(routes)
    .listen(process.env.PORT,()=>{
        console.log('Servidor rodando na porta ' + process.env.PORT)
    })
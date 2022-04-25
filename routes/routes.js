const User = require('../database/Models/User');
const url = require('url')
function routes(req,res){
    if(req.method == "POST" && req.url == "/new"){
        req.on('data',async(data)=>{
            await User.create(JSON.parse(data.toString()));
            res.writeHead(201,{
                "Content-Type":"application/json"
            });
            res.end(JSON.stringify({msg:"Novo usuario cadastrado"}))
        })
    }else if(req.method == "GET" && req.url == "/"){
        const users = User.findAll();
        users.then((values)=>{
            res.writeHead(200,{
                "Content-Type":"application/json"
            });
            res.end(JSON.stringify(values))
        })
    }else if(req.method == "PUT" && req.url[7] == "?"){
        const viewUrl = new URL("localhost:3000"+req.url);
        const queryParam = viewUrl.searchParams;
        const user = User.findOne({where:{id:parseInt(queryParam.get('id'))}});
        if(user){
            req.on('data',async(data)=>{
                await User.update(JSON.parse(data.toString()),{where:{id:parseInt(queryParam.get('id'))}})
                res.writeHead(200,{
                    "Content-Type":"application/json"
                });
                res.end(JSON.stringify({msg:"Usuario atualizado"}))
            });
        }
    }
}

module.exports = routes;
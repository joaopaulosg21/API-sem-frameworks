const User = require('../database/Models/User');
const url = require('url');

async function routes(req,res){
    if(req.method == "POST" && req.url == "/new"){
        req.on('data',async(data)=>{
            await User.create(JSON.parse(data.toString()));
            res.writeHead(201,{
                "Content-Type":"application/json"
            });
            res.end(JSON.stringify({msg:"Novo usuario cadastrado"}));
        })
    }else if(req.method == "GET" && req.url == "/"){
        const users = await User.findAll();
        res.writeHead(200,{
            "Content-Type":"application/json"
        });
        res.end(JSON.stringify(users));
    }else if(req.method == "PUT" && req.url[7] == "?"){
        const viewUrl = new URL("localhost:3000"+req.url);
        const queryParam = viewUrl.searchParams;
        const user = await User.findOne({where:{id:parseInt(queryParam.get('id'))}});
        if(user){
            req.on('data',async(data)=>{
                await User.update(JSON.parse(data.toString()),{where:{id:parseInt(queryParam.get('id'))}});
                res.writeHead(200,{
                    "Content-Type":"application/json"
                });
                res.end(JSON.stringify({msg:"Usuario atualizado"}))
            });
        }else{
            res.writeHead(404,{
                "Content-Type":"application/json"
            });
            res.end(JSON.stringify({msg:"Usuario não existe"}));
        }
    }else if(req.method == "DELETE" && req.url[7] == "?"){
        const viewUrl = new URL("localhost:3000"+req.url);
        const queryParam = viewUrl.searchParams;
        const user = await User.findOne({where:{id:parseInt(queryParam.get('id'))}});
        if(user){
            await User.destroy({where:{id:parseInt(queryParam.get('id'))}});
            res.writeHead(200,{
                "Content-Type":"application/json"
            });
            res.end(JSON.stringify({msg:"Usuario deletado"}));
        }else{
            res.writeHead(404,{
                "Content-Type":"application/json"
            });
            res.end(JSON.stringify({msg:"Usuario não existe"}));
        }
    }
}

module.exports = routes;
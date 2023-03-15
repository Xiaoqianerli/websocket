//创建后台服务器
var WebSocketServer = require('websocket').server;
var http = require('http');
var server = http.createServer();

//create websocket server
wsServer = new WebSocketServer({
    //choose httpServer as wsServer
    httpServer: server
})

//储存所有终端的连接
var c = [];
//ws server request
wsServer.on('request', function(request) {
    console.log(request);
    //current connect
    var connection = request.accept(null, request.origin);
    connection.sendUTF('服务器已成功连接，可以聊天啦～～');

    //把连接储存起来
    c.push(connection);

    //监听有信息来的时候
    connection.on('message', function(message) {
        if(message.type === 'utf8') {
            c.forEach(function(item){
                item.sendUTF(message.utf8Data);
            })
        } else if(message.type === 'binary') {
            c.forEach(function(item){
                item.sendBytes(message.binaryDate);
            })
        }
    })

    //close
    connection.on('close', function(reasonCode, description) {
        //某个连接删除时候。删除数组C中储存的对应连接
        var index = c.indexOf(connection);
        //删除
        c.splice(index, 1);
        console.log('连接关闭')
    })
})

server.listen(3000, function() {
    console.log('服务器开启成功，请打开localhost：3000')
})




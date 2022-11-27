/*
sendServer
sendServer it just a object holding all the functions
to communicate with the server.

*/
var sendServer = (function() {

    function sendServer(socket) {
        this.socket = socket;

    }

    sendServer.prototype = {
        //maby this should be a built into php application
        getRoomKey: function(){
            this.socket.send(JSON.stringify({
                action: 'createServerGetroomkey'
            }));
            console.log("get Room");
        },
        startGame: function(){
            this.socket.send(JSON.stringify({
                action: 'startGame'
            }));
            console.log("start game");
        }
        
    };

    return sendServer;

})();




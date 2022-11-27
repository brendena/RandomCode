/*
connection 
deals with astiblishing the connection.
It also deal with in the inbound traffic.
It doesn't do anything with sending information to the server.
All it does is deal with the inbound traffic and the effects
it has on the view. 
*/
var Connection = (function() {

    function Connection() {
        this.url = "brendensnetwork.asuscomm.com:9001";
        this.makeSocket();
        
        var that = this;
        this.view = new view(this.socket, this.makeSocket, that);
        
        this.view.run();
        
        this.currentState = false;
        
    }

    Connection.prototype = {
        makeSocket: function(){
            this.socket = new WebSocket("ws://" + this.url);
            this.setupConnectionEvents();
        },
        
        setupConnectionEvents: function() {
            var self = this;

            self.socket.onopen = function(evt) { self.connectionOpen(evt); };
            self.socket.onmessage = function(evt) { self.connectionMessage(evt); };
            self.socket.onclose = function(evt) { self.connectionClose(evt); };
        },

        connectionOpen: function(evt) {
            console.log("got open connection");
            this.open = true;
            this.view.updateStatus("open");
        },

        connectionMessage: function(evt) {
            console.log(evt);
            if (!this.open)
                return;
            
            
            
            var data = JSON.parse(evt.data);
            console.log("got" + data['action']);
            console.log(data);
            
            if(data['action'] == 'roomcode'){
                this.view.updateRandomRoomCode(data['response']);
            }
            else if(data['action'] == 'listOfNames'){
                this.view.updateListAllUsers(data['response']);
            }
            else if(data['action'] == 'sentQuestion'){
                this.view.updateQuestion(data['response']);
            }
            else if(data['action'] == 'sendAnswers'){
                console.log("got answers");
                this.view.updateListAnswers(data["response"]);
            }
            else if(data['action'] == 'endOfGameResults'){
                console.log("end of game received");
                this.view.updateEndOfGameResults(data['response']);
            }
            
        },

        connectionClose: function(evt) {
            console.log("got closed connection");
            this.open = false;
            this.view.updateStatus("closed");
            
        },
    };

    return Connection;

})();


var conn = new Connection();
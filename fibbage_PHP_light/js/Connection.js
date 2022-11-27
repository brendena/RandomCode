/*
connection 
deals with astiblishing the connection.
It also deal with in the inbound traffic.
It doesn't do anything with sending information to the server.
All it does is deal with the inbound traffic and the effects
it has on the view. 
*/
var Connection = (function() {

    function Connection(username, url) {
        //http://stackoverflow.com/questions/3780511/reconnection-of-client-when-server-reboots-in-websocket
        this.socket = new WebSocket("ws://" + url);
        this.view = new view(this.socket);
        console.log(this.view);
        this.view.run();
        
        this.currentState = false;
        this.setupConnectionEvents();
    }

    Connection.prototype = {
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
            if (!this.open)
                return;
            
            var data = JSON.parse(evt.data);
            
            console.log("got" + data['action']);
            console.log(data);
            
            if (data['success'] == "false" || data['success'] == false){
                this.errorHandling(data['response']);
            }
            else if (data['action'] == 'responseAddClient'){
                this.view.updateUserIsAdded(data['response']);
            }
            else if (data['action'] == "sentQuestion"){
                this.view.updateQuestion(data['response']);
            }
            else if (data['action'] == "receivedQuestionAnswer"){
                this.view.updateGotQuestionAnswer();
            }
            else if (data['action'] == "sentAnswer"){
                this.view.updateListAnswers(data['response']);
            }
            else if(data['action'] == "receivedFinalAnswer"){
                this.view.updateGotFinalAnswer();
            }
            else if(data['action'] == "serverClosed"){
                this.socket.close();
                console.log("closing server");  
            }
              
        },

        connectionClose: function(evt) {
            this.errorHandling("your server lost connection or you lost connection");
            console.log("got closed connection");
            this.open = false;
            this.view.updateStatus("closed");
            
        },
        errorHandling:function(errorMessage){
            var e = new Error(errorMessage); 
            alert(errorMessage);
            throw e;
            
        }
    };

    return Connection;

})();



var conn = new Connection("default", "brendensnetwork.asuscomm.com:9001");

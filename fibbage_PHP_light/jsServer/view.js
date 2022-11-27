/*
View
The view managages all the events from the dom.
So this is very all the elements are held and events function are kept.
This is also where all the events for the server get fired at.
Thats why it has a sendServer object inside of it.
*/
var view = (function() {
    
    
    function view(socket, reConnectSocket,conn){
        this.sendServer = new sendServer(socket);
        this.a = reConnectSocket.bind(conn);
        console.log("test");
        console.log(reConnectSocket);
        console.log(this.sendServer);
        
    };
    view.prototype = {
        preGame: document.getElementById('preGame'),
        randomRoomCode: document.getElementById('randomRoomCode'),
        listUsers: document.getElementById('listUsers'),
        status: document.getElementById('status'),
        connectionButton: document.getElementById('connectionButton'),
        serverIdTag: document.getElementById('roomId'),
        displayText: document.getElementById('displayText'),
        startButton: document.getElementById('startButton'),
        
        QNASection: document.getElementById('QNASection'),
        QNAText: document.getElementById('QNAText'),
        QNAFlex: document.getElementById('QNAFlex'),
        
        
        resultsSection: document.getElementById('resultsSection'),
        resultsText: document.getElementById('resultsText'),
        resultsFlex: document.getElementById('resultsFlex'),
        
        
        
        updateStatus: function(status){
            this.status.innerHTML = "status - " + status;
        },

        updateRandomRoomCode: function(id){
            this.serverIdTag.innerHTML = "room id - " + id;
            this.connectionButton.style.display = "none";
            this.startButton.style.display = "block";
            this.listUsers.style.display = "block";
        },
        
        updateListAllUsers: function(listUsers){
            var arrayUsers = listUsers.split(' ');
            console.log(arrayUsers);
            concatUserList = 'Users - ';
            
            for(var i = 0; i < arrayUsers.length; i++ ){
                concatUserList += " , " + arrayUsers[i];
            }
            this.listUsers.innerHTML = concatUserList; 
        },
        updateQuestion: function(question){
            this.updateUserInterfaceStates(1);
            this.QNAText.innerHTML =  question;
        },
        updateListAnswers: function(answers){
            this.updateUserInterfaceStates(2);
            concatAnswerList = "";
            
            for(var i = 0; i < answers.length; i++ ){
                concatAnswerList += " <div class='answers'> " + answers[i] +  "</div>";
            }
            
            this.QNAFlex.innerHTML = concatAnswerList;
        },
        updateEndOfGameResults: function(results){
            this.updateUserInterfaceStates(3);
            
            //var displayStats = "<p> Question    " + question + "</p>" + "<p> answer " + answer + //"</p>";
            //this.resultsSection.innerHTML = displayStats;
            
            concatAnswerList = "";
            concatAnswerList = "<button class='btn' id='sendNextQuestion'>send question</button> ";
            
            concatAnswerList += "<div class='answers' id='officalAnswer'><p> Question: " + results['question'] + " </p>   <p> answer: "+ results["answer"] + "</p></div>";
            for(var i = 0; i < results['endResults'].length; i++ ){
                for(var j = 0; j < results['endResults'][i].length; j++){
                    if(j == 0){
                        concatAnswerList += "<div class='answers'> <p> Answer " +  results['endResults'][i][j];
                    }
                    else if(j == 1){
                        concatAnswerList += " - " +  results['endResults'][i][j] + "</p>";
                    }
                    else{
                        concatAnswerList += "fooled " +  results['endResults'][i][j];
                    }
                }
                concatAnswerList += "</div>";
            }
            
            this.resultsFlex.innerHTML = concatAnswerList;
            
            that = this;
            
            document.getElementById('sendNextQuestion').addEventListener("click",function(){
                
                that.sendServer.startGame();
            });
            
            /*
            setTimeout(function(){
                console.log("starting a new game");
                that.sendServer.startGame()}, 30000);
            */
        },
        
        updateUserInterfaceStates:function(number){
            //pre game
            switch(number){
                case 0:
                    this.QNASection.style.display = "none";
                    this.resultsSection.style.display = "none";
                    break;
                //QNA section
                case 1:
                    this.QNASection.style.display = "block";
                    this.QNAFlex.style.display = "none"
                    this.resultsSection.style.display = "none";
                    break;
                case 2:
                    this.QNASection.style.display = "block";
                    this.QNAFlex.style.display = "block"
                    this.resultsSection.style.display = "none";
                    break;
                //results section
                case 3:
                    this.QNASection.style.display = "none";
                    this.resultsSection.style.display = "block";
                    break;
            }
        },
        
        
        //what a hack
        // i need this but i can't use bind because
        // i'll loose the value's of the event.
        run:  function(){
            var that = this;
            //didn't seem to work
            //setTimeout(that.sendServer.getRoomKey,3000);
            
            this.updateUserInterfaceStates(0);
        
            this.connectionButton.addEventListener("click",function(){
                console.log("connection");
                that.sendServer.getRoomKey();
            });
            
            this.startButton.addEventListener("click",function(){
                console.log("started Game");
                that.sendServer.startGame();
            });
            
            this.status.addEventListener("click", function(){
               console.log("peer clicked");
                that.a();
                console.log(that);
            });
            

        }
        
    }

    return view;
})();


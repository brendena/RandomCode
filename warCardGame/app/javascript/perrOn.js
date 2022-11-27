//peer is local person
var peer = new Peer({key: 'obug60hpyawwb3xr'});


//when i create my connection
peer.on('open', function(id){
    $('#pid').text(id);
});

//when i receive data
peer.on('connection', function(othersConn) {
    connHelper.init(
    function(){return peer.connect(othersConn.peer);},
    function(){ $("#gameConnectionBox").css('display','none');
    })

  //here is where we define what happens when we send data
  //to another player
  othersConn.on('data', function(data){
    if(data.hasOwnProperty('card')){
        deckObject.addCard(data.card)
        console.log(data)
    }
    else if(data.hasOwnProperty('flipCard')){
        flipOppenentsCard();
        console.log('flipped');
    }
    else if(data.hasOwnProperty('sentCard')){
        addOpponentsCard(data.sentCard)
    }
    else if(data.hasOwnProperty('chat')){
        addDialog(data.chat,true)
    }
    else{
        console.log(data);
    }
  });
});

//manages all my connections
var connHelper  = function(){
    var conn;
    /*
        send the  value of a cards.
        Purpose: when you first build the deck or you just battled
    */
    var sendCard = function(value){
        conn.send({'card': value});
    };
    /*
        Purpose: send when you've flipped your card, then test to see if you can go to war or not
    */
    var sendFlipCard = function(){
        conn.send({'flipCard':true});
    };
    /*
        Purpose: send after you pick a item of the deck.
    */
    var sendCardSent = function(value){
        conn.send({'sentCard':value});
    };
    /*
        Purpose: is for chat messages.
    */
    var sendChatMessage = function(value){
        conn.send({'chat': value});
    };
    /*
        Purpose: is to make connection if its not init
    */
    var connInit = function(connection, callBackFunction){
        if(typeof conn === 'undefined'){
            conn = connection();
            conn.on('open',callBackFunction);
        }
    };
    return{
      sCard : sendCard,
      sFlipCard : sendFlipCard,
      sCardSent : sendCardSent,
      sChatMessage :sendChatMessage,
      init: connInit
    };
}();
console.log(connHelper);
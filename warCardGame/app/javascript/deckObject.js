//conn is distant person




var deckObject = function(){
    //your deck
    var playersDeck = new Array();
    
    
    /*
    creates the deck and shuffles it
    */
    var createShuffledDeck =  function(){
        var values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        var types = ['&hearts;','&diams;','&clubs;','&spades;'];
        var deck = new Array();;
        for(var i = 0; i < values.length; i++){
            for(var j = 0; j < types.length; j++){
                deck.push(values[i] + types[j]);
            }
        }
        var shuffledDeck = new Array();
        for(i = deck.length; i != 0; i--){
            var index = Math.floor(Math.random() * (deck.length-1));
            shuffledDeck.push(deck[index]);
            deck.splice(index,1);
        }
        return shuffledDeck;
    };
    /*
    takes conn and playerDeck and gives each there cards
    */
    var spreadCardOut = function(){
        var deck = createShuffledDeck();
        console.log(deck.length);
        for(var i = deck.length-1; i  > 0; i-=2){
            console.log(deck[i]);
            playersDeck.push(deck[i])
            connHelper.sCard(deck[i-1]);
        }
    };
    
    var removeTopCard = function(){
        var firstCard = playersDeck[0];
        playersDeck.shift(); //removes first card
        connHelper.sCardSent(firstCard);
        updatePlayerCount();
        return firstCard;
    };
    var addCard = function(value){
        playersDeck.push(value);
        updatePlayerCount();
    }
    var updatePlayerCount = function(){
        $("#playerCardCount").html(playersDeck.length);
    }
    return{
        newGame:spreadCardOut,
        removeTopCard:removeTopCard,
        addCard:addCard
    };
}();


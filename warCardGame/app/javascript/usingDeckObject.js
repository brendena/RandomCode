var playingField = function(){
    var playerHand = new Array();
    var opponentHand = new Array();
    
    var addCardToPlayerHand = function(card){
        playerHand.push(card);
    };
    var addCardToOpponentHand = function(card){
        opponentHand.push(card);
    }
    var getPlayerHandSize = function(){
        
        return playerHand.length;
    }
    var getOpponentsHandSize = function(){
        return opponentHand.length;
    }
    var flushBothHands = function(){
        console.log("flushed");
        playerHand = new Array();
        opponentHand = new Array();
    }
    var addPlayersHandBackToDeck = function(){
        var i;
        console.log(playerHand);
        console.log(opponentHand);
        for(i = 0; i < playerHand.length; i++){
            deckObject.addCard(playerHand[i]);
            deckObject.addCard(opponentHand[i]);
        }
    }
    var addOpponentHandToOpponentDeck = function(){
        var i;
        for(i = 0; i < playerHand.length; i++){
            connHelper.sCard(playerHand[i]);
            connHelper.sCard(opponentHand[i]);
        }
    }
    var cardHelperObject = {
        spliceCard: function(card){
            return card.split("&")[0];
        },
        compareCards : function(opponentsCard, playerCard){
            var oCard = cardHelperObject.spliceCard(opponentsCard);
            var pCard = cardHelperObject.spliceCard(playerCard);
                //opponent Wins
            if(cardValues[oCard] > cardValues[pCard]){
                return 0;
            }
                //player wins
            else if(cardValues[oCard] <  cardValues[pCard]){
                return 1;
            }
            
            // if ther equal
            else{
                return 2;
            }
        }
    }
    /*
        this function will check to see if they can do a battle if they can they will battle and if there is a war it will return 0, so the rest of the game can create the cards needed.
    */
    var checkForBattle = function(){
        
        if(!$('#playerCardObject' + getPlayerHandSize()).hasClass('flippedToBack') && !$('#opponentCardObject' + getOpponentsHandSize()).hasClass('flippedToBack')
           && getPlayerHandSize() === getOpponentsHandSize()){
            console.log('war');
            console.log(playerHand[getPlayerHandSize()-1] + " " + opponentHand[getOpponentsHandSize() -1])
            
            if(battle(opponentHand[getOpponentsHandSize() - 1 ],playerHand[getPlayerHandSize() -1 ]))
                return 1;
        }
        return 0;
    }
    var battle = function(opponentsCard, playersCard){
        var outCome = cardHelperObject.compareCards(opponentsCard,playersCard);
        console.log(outCome);
        if(outCome === 2){
            return 1;
        }
        if(outCome <= 1 ){
            setTimeout(function(){
                if( outCome  === 1){ //player wins
                    addPlayersHandBackToDeck();
                    for(var i = 1; i <= playingField.getHandSize.player(); i++){
                        animate.toDeck("player",$("#player .container:last"));
                        animate.toDeck("player",$("#opponent .container:last"))
                    }
                }
                if( outCome === 0){
                    for(var i = 1; i <= playingField.getHandSize.player(); i++){
                        animate.toDeck("opponent",$("#player .container:last"));
                        animate.toDeck("opponent",$("#opponent .container:last"))
                    }
                }
                playingField.handReset();
            },2000);
            return 0;
        }
    };
    
    var war = function(oCard, pCard){
        
    };
    var cardValues = { "2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,"10":10,"J":11,"Q":12,"K":13,"A":14};
    return{
        getHandSize:{
            opponent:getOpponentsHandSize,
            player:getPlayerHandSize
        },
        addCard:{
            opponent:addCardToOpponentHand,
            player:addCardToPlayerHand
        },
        battle:{
            checkForBattle:checkForBattle
        },
        handReset:flushBothHands
    };
}();


var animate = function(){
    var setTopLeft = function(top,left,element){
        $(element).css("top",top)
                  .css("left",left);
    }
    var topLeftForDeck = function(type,element){
        var $deck = $("#" + type + "Deck");
        setTopLeft($deck.offset().top,$deck.offset().left - $deck.width(),element)
    }
    var topLeftForPlayingField = function(type,element){
        
        var $playingField = $("#" + type);
        setTopLeft($playingField.position().top,($playingField.width() / 2) - $(element).width()/2,element)
    }
    var setUpCardReturn = function(type,element){
        var offset = $(element).offset();
            //subtract the width so the card stay in the same spot
        setTopLeft(offset.top,offset.left - $(element).width(),element); 
        cssObsolute(element);
        
    }
    var cssObsolute = function(element){
        $(element).css("position","absolute");
    }
    var cssRelative = function(element){
        $(element).css("position","relative");
        $(element).css("top","0px");
        $(element).css("left","0px");
    }
    
    var toPlayingField = function(type, element){
        $(element).appendTo(".site-wrap");
        cssObsolute(element);
        topLeftForDeck(type,element);
        
        setTimeout(function(){
            topLeftForPlayingField(type,element);
        },100);
        
        setTimeout(function(){
            $(element).appendTo("#" + type);
            cssRelative(element);
        },1200)
        
    }
    
    var toDeck = function(type, element){
            //added this so you don't see it go from relative to absolute
        $(element).css("transition-duration","0s");
        setUpCardReturn(type,element);
        $(element).appendTo(".site-wrap");
            //readd it so you can see the topLeftForDeck part
        $(element).css("transition-duration","1s");
        
        topLeftForDeck(type,element);
        
        setTimeout(function(){
            $(element).remove();
        },1200);
    }
    return{
        toPlayingField: toPlayingField,
        toDeck: toDeck
    }
}();




var battlePhase = function(){
    var value = playingField.battle.checkForBattle();
    console.log("playing field " + value);
    
    if(value)//if war is true
    {
        if( playingField.getHandSize.player() === 1){
            for(var i = 2; i < 5; i++){
                addCardPlayingField('player',i,deckObject.removeTopCard(),false,true);
            }
            addCardPlayingField('player',i,deckObject.removeTopCard(),true,false);
        }
        //this is incase double war.  you just want to add one card
        else{
            addCardPlayingField('player',playingField.getHandSize.player()+1,deckObject.removeTopCard(),true,false);
        }
    }
} 

var flipOppenentsCard = function(){
    $('#opponentCardObject'+playingField.getHandSize.opponent()).toggleClass('flippedToBack');
    battlePhase();
}


/*
type = player or opponent
number = is the index value of the item so the first one 1 and so on
value = is the cardValue
*/
var createNewCard = function(type, number,value){
    var content = document.querySelector('template').content;
    var clone = document.importNode(content, true);
    clone.childNodes[1].childNodes[1].id = type + "CardObject" + number;
    clone.childNodes[1].childNodes[1].childNodes[1].childNodes[0].id = type + "Card" + number ;
    clone.childNodes[1].childNodes[1].childNodes[1].childNodes[0].innerHTML  = value;
    return clone.childNodes[1];
};

/*
type = player or opponent
number = is the index value of the item so the first one 1 and so on
eventHandler = if its attached to a event handler or not
flippedToBack = is a class and the value accepted are true or false. false being you don't want it anymore
*/
var addCardPlayingField = function(type,number,cardValue,eventHandler,flippedToBack){

    var element = createNewCard(type,number,cardValue);
    if(flippedToBack){
        element.childNodes[1].className = "card";
    }
    else{
        element.childNodes[1].className = "card flippedToBack";
    }
    console.log()
    animate.toPlayingField(type,element);
    
    if(eventHandler){
        $("#"+type+"CardObject"+number).on('click', function(){
            console.log("click");
            if($(this).hasClass('flippedToBack')){
                $(this).toggleClass('flippedToBack');
                //check to see if the other players deckObject flipped
                console.log("oppenents size " + playingField.getHandSize.opponent());
                connHelper.sFlipCard();
                if(playingField.getHandSize.opponent() >= 1){
                    battlePhase();
                }
            };
        });
    }
    if(type == "player"){
        playingField.addCard.player(cardValue);
    }
    else if(type == "opponent"){
        playingField.addCard.opponent(cardValue);
    }
    
}


$('.deck').click(function(){
    
   if(playingField.getHandSize.player() == 0){
       addCardPlayingField("player",1,deckObject.removeTopCard(),true,false);
   }
   
   //addCardPlayingField("player",1,5,true,false);
});

var addOpponentsCard = function(cardValue){
    console.log("asdf opnents size " + playingField.getHandSize.opponent());
    if(playingField.getHandSize.opponent() == 0 || playingField.getHandSize.opponent() >= 4){
        addCardPlayingField('opponent',playingField.getHandSize.opponent() +1,cardValue,false,false)
    }
    else{
        addCardPlayingField('opponent',playingField.getHandSize.opponent() +1,cardValue,false,true)
    }

}



/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
http://www.tek-tips.com/viewthread.cfm?qid=1378317

try useing 
get element by id().getELementbyTageName("section");


*/
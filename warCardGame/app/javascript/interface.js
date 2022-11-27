$('#chatEntered').click(function(){
    addDialog($('#chatInput').val(),false);
    connHelper.sChatMessage($('#chatInput').val());
});

var addDialog = function(info,opponent){
    $('#chatDialog').append(function(){
       var element = document.createElement('p');
       if(opponent) element.className = 'opponentsChat chatMessage';
       else element.className = 'yourChat chatMessage';
       element.innerHTML = info;
       return element;
    });
}

//when clicked it takes the value from connectWith input and connect with peer.
$('#connectWithButton').click(function(){
    connHelper.init(
      function(){
        return peer.connect($('#connectWith').val());},
      function(){
        deckObject.newGame();
        $("#gameConnectionBox").css('display','none');
    });
});


$('#createQRCode').click(function(){
    console.log(document.URL + peer.id);
    var qrcode = new QRCode(document.getElementById("qrcode"), {
    	width : 100,
    	height : 100
    });
    qrcode.makeCode(document.URL + peer.id);
    $("#createQRCode").remove();
});





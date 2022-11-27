// the submit form on the main page of the app
function subitForm()
{
    var sugarContent = document.forms["sugarInformation"]["sugarContent"].value;
    var totalGallonsOfSap = document.forms["sugarInformation"]["TotalGallonsSap"].value;
    var numberPerGallon = document.forms["sugarInformation"]["numberPerGallon"].value;
    var pricePerGallon = document.forms["sugarInformation"]["pricePerPound"].value;
    
    var outputSurguring = calculateSyrup(sugarContent,totalGallonsOfSap,numberPerGallon,pricePerGallon);
    
    inputStartingValue(sugarContent, totalGallonsOfSap, numberPerGallon, pricePerGallon);
    inputResultsText(outputSurguring);
    

    insertElementBegining(outputSurguring);
    localStorageIterator = 0; //reset the iterator;
}
//end of subitForm


//constructor function a syrupObject
function SyrupObject()
{
    this.gallonsOfSapPerSyrup = 0;
    this.totalGallonofSyrup = 0;
    this.totalWeight = 0;
    this.price = 0;
}
//end of SyrupObject

//so this greate a syrup object from the input fileds
function calculateSyrup(sugarContent,totalGallonsOfSap,numberPerGallon,pricePerGallon)
{
    var sugaringObject = new SyrupObject();
    
    sugaringObject.gallonsOfSapPerSyrup = 86 / sugarContent;  //figuring the ratio of sap to syrup
    
    sugaringObject.totalGallonofSyrup = totalGallonsOfSap / sugaringObject.gallonsOfSapPerSyrup; //figuring out the gallons
    
    sugaringObject.totalWeight = sugaringObject.totalGallonofSyrup * numberPerGallon;  //figuring out the weight
    
    sugaringObject.price = sugaringObject.totalWeight * pricePerGallon; //figuring out the price
    
    return sugaringObject;
}
//end of calculateSyrup


$('#sugarInformation').submit(function () {
 subitForm();
 $("#results").css("top","0px");  //bring down the menu
 $("#results").css("background","rgba(255, 201, 25, 0.8)"); //set the background
 $("main").css("display","none"); //set the main thing to nothing

 
 return false;
});







function inputResultsText(outputSurguring)
{
    $("#returnValue").html
    ("<h1 class='white'> gallons Of Sap Per Syrup </h1> <h1>" + outputSurguring.gallonsOfSapPerSyrup.toFixed(2) + "</h1>" +
     "<h1 class='white'> total Gallon of Syrup  </h1> <h1>" + outputSurguring.totalGallonofSyrup.toFixed(2) + "</h1>" +
     "<h1 class='white'> total Weight </h1> <h1>" + outputSurguring.totalWeight.toFixed(2) + "</h1>" +
     " <h1 class='white'>price $</h1> <h1>" + outputSurguring.price.toFixed(2) + "</h1> "
    );
}

function inputStartingValue(sugarContent, totalGallonsOfSap, numberPerGallon, pricePerGallon) {
    console.log("input Stings");
    $("#inputValues").html
    (
         "<p>" + sugarContent + "</p>" +
         "<p>" + totalGallonsOfSap + "</p>" +
         "<p>" + numberPerGallon + "</p>" +
         "<p>" + pricePerGallon + "</p> "
    );
}




function insertElementBegining(outputSurguring)
{
    
    for(var i = 8; i >= 0; i--) //starting one above the rest
    {
        localStorage[i + 1] = localStorage[i];
    }
    localStorage[0] = JSON.stringify(outputSurguring);
}


var localStorageIterator = 0; //the vary first one
function getLastValue(iteration) {
    localStorageIterator += iteration;
    if(localStorageIterator === -1)
    {
        localStorageIterator = 9; 
    }
    else if(localStorageIterator === 10)
    {
        localStorageIterator = 0;
    }
    
    var storage = localStorage[localStorageIterator];
    if (typeof storage != 'undefined' && storage != null && storage != ""  && storage != "undefined")
    {
        console.log(localStorageIterator);
        console.log(retrievedObject);
        var retrievedObject = JSON.parse(storage);
        inputResultsText( retrievedObject);
    }
    else
    {
        localStorageIterator -= iteration;
        if(localStorageIterator === -1)
        {
            localStorageIterator = 9; 
        }
        else if(localStorageIterator === 10)
        {
            localStorageIterator = 0;
        }
        console.log(localStorageIterator);
        console.log("bad object");
    }
}







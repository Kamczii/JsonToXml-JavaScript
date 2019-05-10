

var translations = {
    "name": "Imie",
    "number": "Wiek",
    "city": "Miasto",
    "address":{
        "name":"Adres",
        "number":"Numer",
        "street":{
            "name":"Ulica",
            "happiness":"Zadowolenie",
            "population":{
                "name":"Populacja",
                "woman":"Kobiety",
                "man": "Mezczyzni",
            }
        },
        
    },
    
    
    
};

var json = {  
   "name":"<imie>Imie testowe</imie></Imie>",
   "number":"31",
   "city":"New York",
   "address":{  
      "number":"21",
      "street":{  
         "happiness":"Duze",
         "population":{  
            "man":"21",
            "woman":"25"
         }
      }
   }
};


xml = generateXmlFromJson(json, translations);

document.getElementById("result").innerHTML=xml;


function generateXmlFromJson(json, translations){
    translationsPoint = translations;
    var finalXML = "<root>";
    result = createXml(json);
    finalXML+="</root>";
    
    console.log(finalXML);
    return finalXML;


    function createXml(json, section){
        result = "";
        word = "";
        line="";
    
        jsonVariables = Object.keys(json);
                
        if(section){
            finalXML+="<"+section+">";
        }
        for(var i=0;i<jsonVariables.length;i++){
            
            variable = json[jsonVariables[i]];
            if(typeof variable === 'object' && variable !== null){
                word = translationsPoint[jsonVariables[i]].name;
                translationsPoint = translationsPoint[jsonVariables[i]];
                variable = json[jsonVariables[i]];
                console.log(variable);
                result = createXml(variable, word);
            } else {
                word = translationsPoint[jsonVariables[i]];
                variable = json[jsonVariables[i]];
                console.log(variable);
                variable = checkForSpecialChars(variable.toString());
                finalXML+= "<"+word+">"+variable+"</"+word+">";
            }
        }
    
        if(section){
            finalXML+="</"+section+">";
        }
    
        return result;
    }
    
    function checkForSpecialChars(string){
        string = string.replace(/<+/g,"&lt");
        string = string.replace(/>+/g,"&gt");
        string = string.replace(/\//g,"&#47");
        return string;
    }
}




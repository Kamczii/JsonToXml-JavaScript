

//Przykładowy json z tłumaczeniem
//Tłumaczenie nazwy obiektu pod zmienną "name"
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

//Przykładowy json
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


xml = generateXmlFromJson(json, translations);      //zastosowanie funkcji

document.getElementById("result").innerHTML=xml;    


//Funkcja przyjmuje 2 jsony, jeden z zawartością do konwersji, drugi z tłumaczeniem

function generateXmlFromJson(json, translations){
    
    translationsPoint = translations;   //zmienna, która służy nam do przetrzymania aktualnej pozycji w jsonie z tłumaczeniami (im głębiej w rekurencji, tym dalej w głąb jsona)
    var finalXML = "<root>"; //tutaj zaczynamy definiować zmienną, którą finalnie zwrócimy, zaczynamy od znacznika root.
    result = createXml(json);   //Wywołujemy funkcję pomocniczą do generowania jsona
    finalXML+="</root>";
    
    console.log(finalXML);
    return finalXML;

//Funkcja pomocnicza wykorzystująca rekurencję, section to odpowiadająca nazwa przetłumaczonego obiektu np. Adres
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
            if(typeof variable === 'object' && variable !== null){ //Tutaj wchodzimy w obiekt jsona np. address
                word = translationsPoint[jsonVariables[i]].name;            //tłumaczenie
                translationsPoint = translationsPoint[jsonVariables[i]];    //ustawiamy akutalny punkt w tłumaczeniu
                variable = json[jsonVariables[i]];
                result = createXml(variable, word);
            } else {                                                //Tutaj wchodzimy w zmienne obiektów jsona np. city
                word = translationsPoint[jsonVariables[i]];         //Tłumaczenie, nie ustawiamy zmiennej translationsPoint ponieważ nie wchodzimy w głąb innego obiektu
                variable = json[jsonVariables[i]];
                variable = checkForSpecialChars(variable.toString());
                finalXML+= "<"+word+">"+variable+"</"+word+">";
            }
        }
    
        if(section){
            finalXML+="</"+section+">";
        }
    
        return result;
    }
    
    //Funkcja pomocnicza która zamienia znaki xml na odpowiadające im kody html
    function checkForSpecialChars(string){
        string = string.replace(/<+/g,"&lt");
        string = string.replace(/>+/g,"&gt");
        string = string.replace(/\//g,"&#47");
        return string;
    }
}




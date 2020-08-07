const isAlpha = function(char){
    if(((char>='a')&&(char<='z'))||((char>='A')&&(char<='Z')))
        return true;
    return false;
}


const generateWords = function(doc){    
    var currentWord = '';
    var wordArr = [];

    for(var i=0;i !== doc.length;i++){
        if(isAlpha(doc[i]))
            currentWord += doc[i];
        else{
            if(currentWord.length !== 0)
                wordArr.push(currentWord)
            currentWord = ''
        }
    }
    
    if(currentWord.length !== 0)
        wordArr.push(currentWord)
    return wordArr
}

export {isAlpha, generateWords}
const isAlpha = function(char){
    if(((char>='a')&&(char<='z'))||((char>='A')&&(char<='Z')))
        return true;
    return false;
}

export default isAlpha
import Queue from './queue'

class TrieNode{
    constructor()
    {
        this.children = {};
        this.isEndOfWord = false;
    }
};

class Trie{
    constructor()
    {
        this.root = {};
    }

    insertWord(word)
    {
        if(!this.root[word[0]])
            this.root[word[0]] = new TrieNode()
        var trieNode = this.root[word[0]]
        for(var i=1;i !== word.length;i++)
        {
            if(!trieNode.children[word[i]])
                trieNode.children[word[i]] = new TrieNode()
            trieNode = trieNode.children[word[i]];
        }
        trieNode.isEndOfWord = true
    }

    isContains(word){
        if(!this.root[word[0]])
            return false;
        var trieNode = this.root[word[0]];
        for(var i=1;i !== word.length;i++)
        {
            if(!trieNode.children[word[i]])
                return false
            trieNode = trieNode.children[word[i]]
        }
        return trieNode.isEndOfWord
    }
    
    wordPref(prefWord)
    {
        var wordArr = [];
        if(!this.root[prefWord[0]])
            return [];
        var trieNode = this.root[prefWord[0]];
        for(var i=1;i !== prefWord.length;i++)
        {
            if(!trieNode.children[prefWord[i]])
                return [];
            trieNode = trieNode.children[prefWord[i]]
        }
        var q = new Queue()
        q.push({trieNode,word:prefWord});
        while(!q.empty())
        {
            let childNode = q.front().trieNode
            if(childNode.isEndOfWord)
                wordArr.push(q.front().word)
            Object.keys(childNode.children).forEach(key => q.push({trieNode:childNode.children[key], word:q.front().word.concat(key)}))
            q.pop()
        }
        return wordArr
    }
};

export default Trie;

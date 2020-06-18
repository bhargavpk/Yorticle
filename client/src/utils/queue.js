class Queue{
    constructor()
    {
        this.size = 0;
    }
    push(value)
    {
        this.size++;
        if(!this.head)
        {
            this.head = this.tail = {data:value};
            return;
        }
        var tmpObj = {data:value}
        this.tail.next = tmpObj;
        this.tail = tmpObj;
        if(!this.head.next)
            this.head.next = this.tail;
    }
    pop()
    {
        if(!this.head)
            return;
        this.size--;
        if(!this.head.next)
            this.tail = undefined
        this.head = this.head.next
    }
    front()
    {
        if(this.head)
            return this.head.data
        return undefined
    }
    empty()
    {
        return this.size === 0
    }
};

export default Queue;
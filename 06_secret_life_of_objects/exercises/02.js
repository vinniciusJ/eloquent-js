class Group{
    constructor(){
        this.members = []
    }

    add(member){
        const isARepeatedMember = this.members.includes(member)

        if(!isARepeatedMember) this.members.push(member)
    }

    delete(member){
        const memberID = this.members.indexOf(member)

        if(member !== -1) this.members.splice(memberID, 1)
    }

    has(member){
        return this.members.includes(member)
    }

    static from(values){
        const newGroup = new Group()
        
        for(let value of values){
            newGroup.add(value)
        }

        return newGroup
    }
}

class GroupIterator{
    constructor(group){
        this.group = group
        this.iterator = 0
    }

    next(){       
        if(this.iterator > (this.group.members.length - 1)) return { done: true }

        const value = this.group.members[this.iterator]

        this.iterator++

        return { value, done: false }
    }
}

Group.prototype[Symbol.iterator] = function(){
    return new GroupIterator(this)
}

const group = Group.from([10, 20])

console.log(group.has(10))

group.add(40)
group.delete(40)

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}

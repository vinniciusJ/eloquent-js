const iniCode = 
`searchengine=https://duckduckgo.com/?q=$1
spitefulness=9.7

; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[davaeorn]
fullname=Davaeorn
type=evil wizard
outputdir=/home/marijn/enemies/davaeorn`

const parseINI = code => {
    let result = {}, section = result

    code.split(/\r?\n/).forEach(line => {
        let match 

        if(match = line.match(/^(\w+)=(.*)$/))
            section[match[1]] = match[2]
            
        else if(match = line.match(/^\[(.*)\]$/))
            section = result[match[1]] = {}

        else if(!/^\s*(;.*)?$/.test(line))
            throw new Error(`Line "${line}" is not valid.`)   
    })

    return result
}

console.log(parseINI(iniCode))

// -> /u para emojis

console.log(/🍎{3}/.test("🍎🍎🍎"));

console.log(/<.>/.test("<🌹>"));

console.log(/<.>/u.test("<🌹>"))

// Caracteres internacionais \p

console.log(/\p{Script=Greek}/u.test("α"));

console.log(/\p{Script=Arabic}/u.test("α"));

console.log(/\p{Alphabetic}/u.test("α"));

console.log(/\p{Alphabetic}/u.test("!"))

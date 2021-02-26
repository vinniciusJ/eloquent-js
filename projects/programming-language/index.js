function skipSpace(string){
    let skippable = string.match(/^(\s|#.*)*/)

    return string.slice(skippable[0].length)
}

function parseApply(expression, program){
    program = skipSpace(program)

    if(program[0] != '(') return { expression, rest: program }

    program = skipSpace(program.slice(1))
    expression = { type: 'apply', operator: expression, args: [] }

    while(program[0] != ')'){
        let arg = parseExpression(program)

        expression.args.push(arg.expression)
        program = skipSpace(arg.rest)

        if(program[0] == ',')
            program = skipSpace(program.slice(1))

        else if(program[0] != ')')
            throw new SyntaxError(`Expected ',' or ')'`)
    }

    return parseApply(expression, program.slice(1))
}

function parseExpression(program){
    program = skipSpace(program)

    let match, expression

    if(match = /^"([^"]*)"/.exec(program))
        expression = { type: 'value', value: match[1] }

    else if (match = /^\d+\b/.exec(program))
        expression = { type: 'value', value: Number(match[0]) }

    else if (match = /^[^\s(),#"]+/.exec(program))
        expression = { type: "word", name: match[0] }
    
    else
        throw new SyntaxError(`Unxpected syntax: ${program}`)

    return parseApply(expression, program.slice(match[0].length))
}

function parse(program){
    let { expression, rest } = parseExpression(program)

    if(skipSpace(rest).length > 0){
        throw new SyntaxError('Unexpected text after program')
    }

    return expression
}

const specialForms = Object.create(null)

specialForms['if'] = (args, scope) => {
    if(args.length !== 3)
        throw new SyntaxError('Wrong number of args to if')
    else if(evaluate(args[0], scope) !== false)
        return evaluate(args[1], scope)
    else
        return evaluate(args[2], scope)
}

specialForms['while'] = (args, scope) => {
    if(args.length != 2)
        throw new SyntaxError('Wrong number of args to while')
    
    while(evaluate(args[0], scope) !== false)
        evaluate(args[1], scope)

    return false
}

specialForms['do'] = (args, scope) => {
    let value = false

    for(let arg of args)
        value = evaluate(arg, scope)

    return value
}

specialForms['define'] = (args, scope) => {
    if(args.length != 2 || args[0].type != 'word')
        throw new SyntaxError('Incorrent use of define')

    let value = evaluate(args[1], scope)

    scope[args[0].name] = value

    return value
}

specialForms['fun'] = (args, scope) => {
    if (!args.length) throw new SyntaxError("Functions need a body")
    
    let body = args[args.length - 1]

    let params = args.slice(0, args.length - 1).map(expression => {
        if (expression.type != "word") 
            throw new SyntaxError("Parameter names must be words")
        
        return expression.name
    })

    return function() {
        if (arguments.length != params.length) 
            throw new TypeError("Wrong number of arguments");
        
        let localScope = Object.create(scope)

        for (let i = 0; i < arguments.length; i++)
            localScope[params[i]] = arguments[i]

        return evaluate(body, localScope)
    }
}

specialForms['set'] = (args, env) => {
    if (args.length != 2 || args[0].type != "word") throw new SyntaxError("Bad use of set")
    
    let varName = args[0].name

    let value = evaluate(args[1], env)
  
    for (let scope = env; scope; scope = Object.getPrototypeOf(scope)) {
      if (Object.prototype.hasOwnProperty.call(scope, varName)) {
        scope[varName] = value
        
        return value
      }
    }
    throw new ReferenceError(`Setting undefined variable ${varName}`)
  }

const topScope = Object.create(null)

topScope['true'] = true
topScope['false'] = false

for(let op of ['+', '-', '*', '/', '==', '<', '>'])
    topScope[op] = Function('a, b', `return a ${op} b`)

topScope['print'] = value => {
    console.log(value)

    return value
}

topScope['array'] = (...values) => values

topScope['length'] = array => array.length

topScope['element'] = (array, index) => array[index]

function evaluate(expression, scope){
    if(expression.type == 'value'){
        return expression.value
    }
    else if(expression.type == 'word'){
        if(expression.name in scope)
            return scope[expression.name]
        else
            throw new ReferenceError(`Undefined binding: ${expression.name}`)
    }
    else if(expression.type == 'apply'){
        let { operator, args } = expression

        if(operator.type == 'word' && operator.name in specialForms){
            return specialForms[operator.name](expression.args,scope)
        }
        else{
            let op = evaluate(operator, scope)

            if(typeof op == 'function')
                return op(...args.map(arg => evaluate(arg, scope)))
            else
                throw new TypeError('Applying a non-function.')
        }
    }
}

function run(program){
    return evaluate(parse(program), Object.create(topScope))
}

run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
`)

run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`)

run(`
do(define(pow, fun(base, exp,
    if(==(exp, 0),
       1,
       *(base, pow(base, -(exp, 1)))))),
  print(pow(2, 10)))
`)

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`)

run(`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
`)

run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`)

run(`set(quux, true)`)
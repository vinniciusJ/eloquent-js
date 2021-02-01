require("./code/load")("code/data.js", "code/index.js");

// Código com mais códigos reservados pelo padrão Unicode
console.log(SCRIPTS.reduce((a, b) => characterCount(a) < characterCount(b) ? b : a))

// Média de idade dos códigos vivos e dos já mortos
console.log(Math.round(average(
    SCRIPTS.filter(s => s.living).map(s => s.year)
)))

console.log(Math.round(average(
    SCRIPTS.filter(s => !s.living).map(s => s.year)
)))

// Buscando códigos dentro do Script
console.log('121 =>', characterScript(121))


console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
//console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
const quotes = /(^|\W)'|'(\W|$)/g
const text = "'I'm the cook,' he said, 'it's my job.'"

console.log(text.replace(quotes, '$1"$2'))
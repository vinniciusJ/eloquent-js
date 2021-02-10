const expression1 = /ca[rt]/

verify(
    expression1,
    ["my car", "bad cats"],
    ["camper", "high art"]
)

const expression2 = /[pr?op]/

verify(
    expression2,
    ["pop culture", "mad props"],
    ["plop", "prrrop"]
)

const expression3 = /ferr(et|y|ari)/

verify(
    expression3,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]
)

const expression4 = /ious\b/

verify(
    expression4,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]
)

const expression5 = /\s[\.,:;]/

verify(
    expression5,
    ["bad punctuation ."],
    ["escape the period"]
)

const expression6 = /\w{7}/

verify(
    expression6,
    ["Siebentausenddreihundertzweiundzwanzig"],
    ["no", "three small words"]
)

const expression7 = /\b.[^\We]+\b/i

verify(
    expression7,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape", "BEET"]
)

function verify(regexp, yes, no) {
    if (regexp.source == "...") return

    for (let str of yes) if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`)
    }

    for (let str of no) if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`)
    }
}
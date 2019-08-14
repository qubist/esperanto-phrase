import { Filigree } from 'filigree-text'
import fs from 'fs'

// slurp filigree source from file
let source = fs.readFileSync('esperanto-phrase.filigree','utf8')

// parse filigree source
let fil = new Filigree(source)
if (fil.err) {
    // if the source is has syntax errors, they will be shown here
    console.error(fil.err.message)
    process.exit(1)
}

// ** modifier functions **
// should accept a string and return a string.

// decline noun phrase into the accusitive
// use only on noun-phrase without article
fil.modifiers.n = (input : string) => {
    var pattern = /([ioaej])( |,|$)/gi
    return input.replace(pattern, '$1n$2')
}
// pluralize noun phrase
// use only on noun-phrase without article
fil.modifiers.j = (input : string) => {
    var pattern = /([oae])( |,|$)/gi
    return input.replace(pattern, '$1j$2')
}

// add "mal" prefix
// use only on adjectives
fil.modifiers.mal = (input : string) => {
  return 'mal' + input
}
// add verb tense endings
// use only on verbs
fil.modifiers.is = (input : string) => input + 'is'
fil.modifiers.as = (input : string) => input + 'as'
fil.modifiers.os = (input : string) => input + 'os'
fil.modifiers.us = (input : string) => input + 'us'

// transitivity verb endings
// use only on verbs
fil.modifiers.ig = (input : string) => {
  return input + 'ig'
}
fil.modifiers.iĝ = (input : string) => {
  return input + 'ig'
}


// generate a string from the "output" rule
let n = 25
for (let i = 0; i < n; i++) {
console.log(fil.generate('output'))
}

// you can also supply a "wrapper" function to add markup around the results
// as the rules are put together.
let wrapperFn = (rule : string, text : string) : string =>
    `<div style="padding:10px display:inline border: 1px dotted red border-radius:5px'>
        <sup>${rule}</sup>
        ${text}
    </div>`
// console.log(fil.generate('phrase', wrapperFn))

require('./code/load')('code/journal.js', 'code/chapter/index.js')

for(let event of journalEvents(JOURNAL)){
    let correlation = phi(tableFor(event, JOURNAL))

    if(correlation > 0.1 || correlation < -0.1)
        console.log(`${event}: ${correlation}`) 
}
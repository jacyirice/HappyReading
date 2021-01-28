const { MethodNotAllowed } = require('http-errors');
const { Meeting } = require('../models');
let emails = [];
Meeting.findOne({ where: { id: 5 } }).then(meeting => {
    meeting.getUser_has_meetings().then(inscriptions => {
        inscriptions.forEach(
            inscription => {
                inscription.getUser().then(user => {
                    emails.push(user.email)
                })
                console.log(emails);
            }
        )
        console.log(emails);
    })
})

const meeting = await Meeting.findOne({ where: { id: 5 } })
const inscriptions = meeting.getUser_has_meetings()
inscriptions.forEach(
    inscription => {
        let user = inscription.getUser()
        emails.push(user.email)
    })
console.log(emails);
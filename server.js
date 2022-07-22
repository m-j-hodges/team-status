const inquire = require('inquirer')
const cheerio = require('cheerio')
const fs = require('fs');
const { resolve } = require('path');
const userInput = process.argv[2];



let questionArray = [
  {
    type: 'input',
  message: `What is your team member's name?`,
  name: 'name',
},
  {
    type: 'input',
  message: `What is the team member's ID?`,
  name: 'empId',
},
  {
    type: 'input',
  message: `What is the team member's e-mail address?`,
  name: 'email',
},
  {
    type: 'input',
  message: `What is the team member's Github username?`,
  name: 'gitUserName',
},
  {
    type: 'input',
  message: `What is the team member's office number?`,
  name: 'officeNum',
},
]
let Emp1
let Emp2
let Emp3
const questions = [
  { type:'input',
  message: `Do you have any other employees you wish to add?`,
  name: 'additionalEmps'}
]
createEmp()
function createEmp() { 
  return new Promise((resolve,reject) => {
  inquire.prompt(questionArray)
.then((answers) => {
    let empName = answers.name
    let empIdNumber = answers.empId
    let empEmail = answers.email
    let empOffNum = answers.officeNum
    let gitUser = answers.gitUserName
    if (Emp1 == undefined) {
    Emp1 = new Person(empName, empEmail, empIdNumber,gitUser,empOffNum);}
    else if (Emp2 == undefined) {
      Emp2 = new Person(empName, empEmail, empIdNumber,gitUser,empOffNum);}
     else if (Emp3 == undefined) { 
      Emp3 = new Person(empName, empEmail, empIdNumber,gitUser,empOffNum);}
    //insert code here to append new employee to the document.body of the html

    
    console.log(Emp1, Emp2, Emp3)
    secondQs()
    if(Emp1 !== undefined) { resolve(Emp1)}
    else if(Emp2 !== undefined) {resolve(Emp2)}
    else if(Emp3 !== undefined) {resolve(Emp3)}
    else{ 
      const issue = console.log("error occurred.")
      reject(issue)}
  })})}


function secondQs() {
  return new Promise((resolve,reject) => {inquire.prompt(questions)
.then((output) => {
 if (output.additionalEmps == "yes" || output.additionalEmps == "Yes" || output.additionalEmps == "y") {
  createEmp()
 } else if(output.additionalEmps == "no") {
  createCards()
 }
 else {
  reject(console.log("an error has occurred."))
 }

})})}

function createCards() {
  let htmlFile = './public/roster.html'
  let writeLocation = './public/newFile.html'
  let cardEmp1
  let cardEmp2
  let cardEmp3
  let cardData = ``
  if (Emp1 !== undefined) {
  cardEmp1 = `<div class="col-sm-3">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${Emp1.name}</h5>
      <p class="card-subtitle mb-2 text-muted">${Emp1.empId}</p>
      <a href="mailto:${Emp1.email}">${Emp1.email}</a>
      <a class="d-block" href="http://${Emp1.gitUserName}">github username: ${Emp1.gitUserName}</a>
      <p>Employee office number: ${Emp1.officeNumber}</p>
    </div>
</div>`
cardData += cardEmp1
}
  if (Emp2 !== undefined) {
  cardEmp2 = `<div class="col-sm-3">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${Emp2.name}</h5>
      <p class="card-subtitle mb-2 text-muted">${Emp2.empId}</p>
      <a href="mailto:${Emp2.email}">${Emp2.email}</a>
      <a class="d-block" href="http://${Emp2.gitUserName}">github username: ${Emp1.gitUserName}</a>
      <p>Employee office number: ${Emp2.officeNumber}</p>
    </div>
</div>`
cardData += cardEmp2
}

  const htmlToBeWritten = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Team Roster</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
    <header>
      <h1> Your team Roster</h1>
  
    </header>
    <h3> Team Members</h3>
    ${cardData}
  
  <script type="javascript/text" src="./javascript.js"></script>
  </body>
  </html>`;
  fs.writeFile('text.html', htmlToBeWritten, (err) => {
    err ? console.log(err) : console.log("success!");
  })


}



class Person {
  constructor(name, email,empId, gitUserName, officeNum) {
    this.name = name;
    this.email = email;
    this.empId = empId;
    this.gitUserName = gitUserName;
    this.officeNumber = officeNum;
  }
}

function createNewPerson() {
  new Person()

}

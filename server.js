const inquire = require('inquirer')
const cheerio = require('cheerio')
const fs = require('fs');

const express = require('express')
const PORT = 3001
const open = require('open');
const { resolve } = require('path');
const { create } = require('domain');
const app = express();
// app.use(express.static('public'));


let questionArray =[
  {
    type: 'input',
  message: `What is your team manager's name?`,
  name: 'name',
},
  {
    type: 'input',
  message: `What is the team manager's employee ID?`,
  name: 'empId',
},
  {
    type: 'input',
  message: `What is the team manager's e-mail address?`,
  name: 'email',
},
  {
    type: 'input',
  message: `What is the team manager's Github username (e.g. KarlMarx2017)?`,
  name: 'gitUserName',
},
  {
    type: 'input',
  message: `What is the team manager's office number?`,
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
    Emp1 = new Manager(empName, empEmail, empIdNumber,gitUser,empOffNum);}
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

const prompts = [
  {
    type:'list',
    message: 'Which type of employee would you like to add?',
    name: 'typeOfEmployee',
    choices: ["intern", "engineer"]
   }]
const internQs = [
    {
      type: 'input',
      message: 'What is the intern\'s name?',
      name: 'name'
    },
    {
      type: 'input',
      message: 'What is the intern\'s employee ID?',
      name: 'id'
    },
    {
      type: 'input',
      message: 'What is the intern\'s email address?',
      name: 'email'
    },
    {
      type: 'input',
      message: 'What is the intern\'s school?',
      name: 'School'
    }

  ]

  const engineerQs = [
    {
      type: 'input',
      message: 'What is the engineer\'s name?',
      name: 'name'
    },
    {
      type: 'input',
      message: 'What is the engineer\'s employee ID?',
      name: 'empId'
    },
    {
      type: 'input',
      message: 'What is the engineer\'s email address?',
      name: 'email'
    },
    {
      type: 'input',
      message: 'What is the engineer\'s Github Username (e.g. KarlMarx2017)?',
      name: 'gitUsername'
    }
  ]

function EngineerOrIntern() {
  inquire.prompt(prompts)
  .then((answers) => {
    if(answers.typeOfEmployee == 'intern') {
      console.log(answers.typeOfEmployee)
      runInternQs()
    function runInternQs() {  
      inquire.prompt(internQs)
      //run code to generate a new intern
      .then((newAnswers) => createIntern(newAnswers))}
      
      } else if(answers.typeOfEmployee == 'engineer') {
        inquire.prompt(engineerQs)
        .then((yourAnswers) => createEngineer(yourAnswers) )
        } })}


function secondQs() {
  return new Promise((resolve,reject) => {inquire.prompt(questions)
.then((output) => {
 if (output.additionalEmps == "yes" || output.additionalEmps == "Yes" || output.additionalEmps == "y") {
  EngineerOrIntern()
  }
 else if(output.additionalEmps == "no") {
  createCards()
 }
 else {
  reject(console.log("an error has occurred."))}
})})}
  
  


let newIntern
function createIntern(newAnswers) {
  //input parameters to create a new intern 
  const internName = newAnswers.name
  const internId = newAnswers.id
  const internEmail = newAnswers.email
  const internSchool = newAnswers.School
  newIntern = new Intern(internName,internId,internEmail,internSchool)
  secondQs()
}
let newEngineer
function createEngineer(yourAnswers) {
  console.log(yourAnswers)
  if(newEngineer == undefined) {
    const engineerName = yourAnswers.name;
    const engineerEmail = yourAnswers.email;
    const engineerEmpId = yourAnswers.empId;
    const engineerGitUser = yourAnswers.gitUsername;
    newEngineer = new Engineer(engineerName, engineerEmpId, engineerEmail, engineerGitUser)
    secondQs()
  } else if (newEngineer !== undefined) {
    const engineerName = yourAnswers.name;
    const engineerEmail = yourAnswers.email;
    const engineerEmpId = yourAnswers.empId;
    const engineerGitUser = yourAnswers.gitUsername;
    newEngineer2 = new Engineer(engineerName, engineerEmpId, engineerEmail, engineerGitUser)
    secondQs()
  }

} 

function createCards() {
  let htmlFile = './public/roster.html'
  let writeLocation = './public/newFile.html'
  let cardEmp1
  let cardEmp2
  let cardEmp3
  let cardData = ``
  if (Emp1 !== undefined) {
  cardEmp1 = `<div class="col-sm-4"></div>
  <div class="col-sm-6">
    <div class="card m-3 border border-success" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${Emp1.name}</h5>
        <h5 class="card-title">Title:<strong>Manager</strong></h5>
        <p class="card-subtitle mb-2 text-muted">Employee ID:${Emp1.empId}</p>
        <a href="mailto:${Emp1.email}">${Emp1.email}</a>
        <a class="d-block" href="http://${Emp1.gitUserName}">github username: ${Emp1.gitUserName}</a>
        <p>Employee office number: ${Emp1.offNum}</p>
      </div>
  </div>`
cardData += cardEmp1
}
  if (Emp2 !== undefined) {
  cardEmp2 = `<div class="col-sm-3">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${Emp2.name}</h5>
      <p class="card-subtitle mb-2 text-muted">Employee ID:${Emp2.empId}</p>
      <a href="mailto:${Emp2.email}">${Emp2.email}</a>
      <a class="d-block" href="http://${Emp2.gitUserName}">github username: ${Emp1.gitUserName}</a>
      <p>Employee office number: ${Emp2.officeNumber}</p>
    </div>
</div>
</div>`
cardData += cardEmp2
}
 if(newIntern !== undefined) {
  let internCard = `<div class="col-sm-3">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${newIntern.name}</h5>
      <h5 class="card-title">Title:Intern</h5>
      <p class="card-subtitle mb-2 text-muted">Employee ID:${newIntern.empId}</p>
      <a href="mailto:${newIntern.email}">${newIntern.email}</a>
      <p>Intern School: ${newIntern.school}
    </div>
</div>
</div>`
cardData += internCard
 }
 if(newEngineer !== undefined) {
  let engineerCard = `<div class="col-sm-3">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${newEngineer.name}</h5>
      <h5 class="card-title">title: Engineer</h5>
      <p class="card-subtitle mb-2 text-muted">${newEngineer.empId}</p>
      <a href="mailto:${newEngineer.email}">${newEngineer.email}</a>
      <a class="d-block" href="http://${newEngineer.gitUserName}">github username: ${newEngineer.gitUserName}</a>
    </div>
</div>
</div>`
cardData += engineerCard}
let newEngineer2
 if(newEngineer2 !== undefined) {
  let engineerCard = `<div class="col-sm-3">
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${newEngineer2.name}</h5>
      <h5 class="card-title">title: Engineer</h5>
      <p class="card-subtitle mb-2 text-muted">${newEngineer2.empId}</p>
      <a href="mailto:${newEngineer2.email}">${newEngineer2.email}</a>
      <a class="d-block" href="http://${newEngineer2.gitUserName}">github username: ${newEngineer2.gitUserName}</a>
    </div>
</div>
</div>`
cardData += engineerCard
 }

  const htmlToBeWritten = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Team Roster</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
  </head>
  <body>
<h1 class="p-4 text-center"> Team Roster</h1>
  <div class="row">
${cardData}
  </div>
 
  <script type="javascript/text" src="./javascript.js"></script>
  </body>
  </html>`;
  fs.writeFile('text.html', htmlToBeWritten, (err) => {
    err ? console.log(err) : console.log("success!");
  }, async () => await open('text.html',{app: 'google chrome'}))
 
}

class Engineer{
  constructor(name,empId,email,gitUserName){
  this.name = name;
  this.empId = empId
  this.email = email
  this.gitUserName = `www.github.com/${gitUserName}`
  }
}
class Intern{
  constructor(name,empId,email,school){
  this.name = name;
  this.empId = empId
  this.email = email
  this.school = school
  }
}
// class for Managers
class Manager{
  constructor(name, email, empId, gitUserName, offNum) {
    this.name = name;
    this.empId = empId;
    this.email = email;
    this.gitUserName = `www.github.com/${gitUserName}`;
    this.offNum = offNum;
  }
}
// class for an employee
class Person {
  constructor(name, email,empId, gitUserName, officeNum) {
    this.name = name;
    this.email = email;
    this.empId = empId;
    this.gitUserName = `www.github.com/${gitUserName}`;
    this.officeNumber = officeNum;
  }
}


function createNewPerson() {
  new Person()

}

module.exports = Engineer
module.exports = createEngineer;
module.exports = createCards;
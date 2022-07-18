const inquire = require('inquirer')
const userInput = process.argv[2];

questionArray = [
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
  message: `What is the manager's Github username?`,
  name: 'gitUserName',
},
  {
    type: 'input',
  message: `What is the team manager's office number?`,
  name: 'officeNum',
},

]
inquire.prompt(questionArray)
.then((answers) => {
    const empName = answers.name
    const empIdNumber = answers.empId
    const empEmail = answers.email
    const empOffNum = answers.officeNum
    const gitUser = answers.gitUserName
    
    const Emp1 = new Person(empName, 'Engineer', empEmail, empIdNumber,gitUser,empOffNum);
    console.log(Emp1)
  })




class Person {
  constructor(name, position, email,empId, gitUserName, officeNum) {
    this.name = name
    this.position = position;
    this.email = email;
    this.empId = empId;
    this.gitUserName = gitUserName;
    this.officeNumber = officeNum;
  }
}

function createNewPerson() {
  new Person()

}

const createEngineer = require("../server")


const engineerObj = {name:'John Pineapple', email:'mrpineapple@gmail.com',empId:23048, gitUserName:'Pineapple2040', offNum:305}

class Engineer{
  constructor(name,empId,email,gitUserName){
  this.name = name;
  this.empId = empId
  this.email = email
  this.gitUserName = `www.github.com/${gitUserName}`
  }
}
describe('server', () => {
  it('Should create a new engineer object based on user inputs.', () => {
    let newEngineer = "yes"
    const newEng = new Engineer(engineerObj)
    const expectedArray = {name: 'John Pineapple'}
   expect(newEng.name).toMatchObject(engineerObj)
   

})})

describe('Does it create a card and write it to a variable?', () => {
  it('Should result in a variable with a string.', () => {
    let Emp1 = engineerObj
    let cardData
    const createCard = createEngineer(Emp1)
    expect(Emp1.name).toMatchObject(expect.anything());
    expect(Emp1.name).toMatchObject(expect.anything())
    expect(cardData).toContain(`${Emp1.name}`)
  }

)} )

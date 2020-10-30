

// Never do this practice, this is onlydone for testing purposes 
var developers = [
  {name : 'Hector', age : 23, language : ['French', 'Spanish']},
  {name : 'Samu', age : 21, language : ['Catalan', 'English']},
  {name : 'Dani', age : 20, language : ['French','Catalan','Spanish']},
  {name : 'Oriol', age : 21, language : ['French','English','Spanish']},
  {name : 'Albert', age : 22, language : ['English', 'Spanish']},
  {name : 'Ruben', age : 22, language : ['Catalan', 'Spanish']},
]

/**
 * Method GET : send all developers information that matches the query.
 * @param {*} req query : name, age, language
 * @param {*} res Developers
 */
function getHelloWorld(req,res){
  const {name, age, language} = req.query // Get name of the humans to be 
  var queriedDevelopers = developers.filter(dev =>{
    if (name && !dev.name.includes(name)) return false
    if(age && dev.age != age) return false
    if (language && !dev.language.includes(language.trim())) return false
    return true
  })
  

  return res.status(200).send(queriedDevelopers)
}

function postHelloWorld(req,res){
  const {body} = req
  if (!body || !body.name || !body.age || !body.language ) return res.status(400).send({"message": "Body has to be an object called dev which syntax must be : name / age/ language !"})
  developers.push(body)
  return res.status(201).send({"Message":"Successfully added developer!"})
}

function putHelloWorld(req,res){
    const {name} = req.param
    const {body} = req
    if (developers.filter(dev=> dev.name === name).length < 1) return res.status(400).send({"message": `Couldn't find any developers whose name is ${name}`})
    for (let dev of developers){
      if (dev.name === name) {
        dev.age = body.age || dev.age
        if (body.language && body.language.trim()) dev.language.push(body.language) 
      }
    }
    return res.status(200).send({"Message":"Successfully modifed developers!"})
}

function deleteHelloWorld(req,res){
  const {name} = req.param
  if (developers.filter(dev=> dev.name === name).length < 1) return res.status(400).send({"message": `Couldn't find any developers whose name is ${name}`})
  developers = developers.filter(dev=> dev.name !== name)
  return res.status(200).send({"Message":"Successfully modifed developers!"})
}

module.exports = {developers,getHelloWorld, postHelloWorld, putHelloWorld, deleteHelloWorld}
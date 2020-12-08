// Import the interpreter and add p5 functions
// The js interpreter used is from https://github.com/arcatdmz/JS-Interpreter
// which is in turn based on the js interpreter by Neil Fraser.

import * as acorn from 'acorn'
import * as Interpreter from 'JS-Interpreter'
import interpreterFunctions from './interpreterFunctions.js'

// set the parser
Interpreter.acorn = acorn

// Call this function with a p5 instance to get a js interpreter
const createInterpreter = function(p5, stateManager) {
  // The initialization function for the interpreter
  // in which we add all the p5 functions
  var initFunc = function(interpreter, scope) {
    // create p5 object for inside the interpreter scope
    var pseudoP5 = interpreter.nativeToPseudo({})
    interpreter.setProperty(scope, 'p5', pseudoP5)

    // port p5 functions
    interpreterFunctions.p5.forEach(functionName => {
      if (functionName in p5) {
        if (typeof p5[functionName] === 'function') {
          interpreter.setProperty(
            pseudoP5,
            functionName,
            interpreter.createNativeFunction(function(...args) {
              return p5[functionName](...args)
            })
          )
        } else {
          // TODO something else than functions
          interpreter.setProperty(
            pseudoP5,
            functionName,
            interpreter.createNativeFunction(function() {
              return p5[functionName]
            })
          )
        }
      } else {
        console.log(`Error: ${functionName} not in p5`)
      }
    })

    // Pass the stateManager for getting and setting state variables
    var pseudostateManager = interpreter.nativeToPseudo({})
    interpreter.setProperty(scope, 'state', pseudostateManager)
    interpreter.setProperty(
      pseudostateManager,
      'setAddress',
      interpreter.createNativeFunction(function(...args) {
        return stateManager.setAddress(...args)
      })
    )
    interpreter.setProperty(
      pseudostateManager,
      'get',
      interpreter.createNativeFunction(function(variableName, index) {
        return stateManager.get(variableName, index)
      })
    )
    interpreter.setProperty(
      pseudostateManager,
      'set',
      interpreter.createNativeFunction(function(variableName, value) {
        return stateManager.set(variableName, value)
      })
    )

    // TODO replace with other printing mechanism?
    var pseudoConsole = interpreter.nativeToPseudo(console)
    interpreter.setProperty(scope, 'console', pseudoConsole)
  }

  const startCode = 'console.log("Interpreter started...");'
  return new Interpreter(startCode, initFunc)
}

export default createInterpreter

import P5 from 'p5'
import 'p5/lib/addons/p5.sound'
import ml5 from 'ml5'
import createInterpreter from './interpreter.js'
import {
  StateVariable,
  Stone,
  BuiltInStone,
  UserDefinedStone,
  StoneInstance,
  Project,
  ProjectList,
  Connection
} from './classes/index.js'
import builtInStones from './builtInStones/index.js'
import StateManager from './StateManager.js'

class Cobble {
  // constructor
  constructor(cobbleProject) {
    this.p5 = null
    this.interpreter = null
    this.project = cobbleProject
    this.stateManager = new StateManager(cobbleProject.stoneInstances)
    this.InitializeP5()
    this.InitializeInterpreter()
  }

  // initialization
  InitializeP5() {
    this.p5 = new P5(p5 => {
      // We need a 'pseudo' start that actually gets executed
      // later from the draw function, because at the time of
      // the real setup() function the interpreter may not be
      // created yet.
      let pseudoStartExecuted = false
      const pseudoStart = () => {
        // Call start on stones in project:
        console.log(P5)
        this.project.stoneInstances.forEach(stoneInstance => {
          stoneInstance.start({
            p5,
            p5Lib: P5,
            interpreter: this.interpreter,
            state: this.stateManager,
            instanceId: stoneInstance.id,
            ml5
          })
        })
      }

      p5.setup = () => {
        // Create canvas:
        const canvasHolder = document.getElementById('canvas-holder')
        const sketchCanvas = p5.createCanvas(
          canvasHolder.offsetWidth,
          canvasHolder.offsetHeight
        )
        sketchCanvas.parent('canvas-holder')
      }
      p5.draw = () => {
        if (this.interpreter != null) {
          // ready
          if (!pseudoStartExecuted) {
            // initialize global cobbleRun
            window.cobbleRun = { running: true }
            // console.log('executing pseudo start...')
            pseudoStart()
            pseudoStartExecuted = true
          }
          // apply connections:
          this.project.stoneInstances.forEach(stoneInstance => {
            stoneInstance.connections.forEach(connection => connection.apply())
          })
          // Call update on stones in project:
          this.project.stoneInstances.forEach(stoneInstance => {
            stoneInstance.update({
              p5,
              p5Lib: P5,
              state: this.stateManager,
              interpreter: this.interpreter,
              instanceId: stoneInstance.id,
              ml5
            })
          })
        } else {
          console.log('Waiting for p5 and interpreter...')
        }
      }
    })
  }

  InitializeInterpreter() {
    this.interpreter = createInterpreter(this.p5, this.stateManager)
    this.interpreter.run()
  }

  stop() {
    // Stop global stuff
    console.log('Stopping...')
    window.cobbleRun = {}
  }
}

// Classes as static properties
Cobble.StateVariable = StateVariable
Cobble.Stone = Stone
Cobble.BuiltInStone = BuiltInStone
Cobble.UserDefinedStone = UserDefinedStone
Cobble.StoneInstance = StoneInstance
Cobble.Project = Project
Cobble.ProjectList = ProjectList
Cobble.Connection = Connection

// static list of built-in stones
Cobble.builtInStones = builtInStones

export default Cobble

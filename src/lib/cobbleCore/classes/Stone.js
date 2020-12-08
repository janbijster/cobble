// Cobblestone base class
// Each stone has a list of state, a start and an update function.
class Stone {
  constructor({ name, role, state, onlyOne = false }) {
    this.name = name
    this.role = role
    this.state = state
    this.onlyOne = onlyOne
  }

  start() {
    console.log(`Start() called on cobbleStone ${this.name}`)
  }

  update() {}
}

// types
const StoneTypes = Object.freeze({
  builtIn: 'Built-in',
  userDefined: 'User-defined'
})

Stone.Types = StoneTypes

export default Stone

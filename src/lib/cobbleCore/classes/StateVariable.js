// State Variable class
class StateVariable {
  constructor({ name, type, value = null, isInput = true, isOutput = true }) {
    this.name = name
    this._type = StateVariableTypes[type.name]
    this.isInput = isInput
    this.isOutput = isOutput
    this._value =
      value !== null
        ? this.type == StateVariableTypes.number
          ? Number(value)
          : value
        : type.default

    // type check
    console.assert(
      typeof this.value === this.type.typeName,
      this.value,
      typeof this.value,
      this.type.typeName
    )
  }

  set value(newValue) {
    // type check
    this._value = newValue
  }

  get value() {
    return this._value
  }

  set type(stateVariableType) {
    this._type = stateVariableType
    this.value = stateVariableType.default()
    // console.log(this._value)
  }

  get type() {
    return this._type
  }

  get length() {
    return this._type == StateVariableTypes.vector ? this.value.length : 1
  }

  getCopy() {
    const newValue = this.type.name == 'vector' ? [...this.value] : this.value
    return new StateVariable({
      name: this.name,
      type: this.type,
      value: newValue,
      isInput: this.isInput,
      isOutput: this.isOutput
    })
  }

  compare(otherStateVariable) {
    return JSON.stringify(this) == JSON.stringify(otherStateVariable)
  }

  serialize() {
    return {
      name: this.name,
      type: this._type,
      value: this.value,
      isInput: this.isInput,
      isOutput: this.isOutput
    }
  }

  static Deserialize({ data }) {
    return new StateVariable(data)
  }
}

// Variable types "enum"
const StateVariableTypes = Object.freeze({
  number: {
    name: 'number',
    type: Number,
    typeName: 'number',
    default: () => 0
  },
  vector: {
    name: 'vector',
    type: Array,
    typeName: 'object',
    default: () => [0]
  },
  string: {
    name: 'string',
    type: String,
    typeName: 'string',
    default: () => ''
  }
})
// set as static property on the class
StateVariable.Types = StateVariableTypes

export default StateVariable

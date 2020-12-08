import StateVariable from './StateVariable.js'

class Connection {
  constructor({
    myStoneInstance,
    toStoneInstance,
    myVariableIndex = 0,
    toVariableIndex = 0,
    myValueIndex = 0,
    toValueIndex = 0
  }) {
    this.myStoneInstance = myStoneInstance
    this.toStoneInstance = toStoneInstance
    this.myVariableIndex = myVariableIndex
    this.toVariableIndex = toVariableIndex
    this.myValueIndex = myValueIndex
    this.toValueIndex = toValueIndex

    // Editor variables:

    // later set by vue component when created
    this.fromElement = null
    this.toElement = null
  }

  getCopy() {
    return new Connection({
      myStoneInstance: this.myStoneInstance,
      toStoneInstance: this.toStoneInstance,
      myVariableIndex: this.myVariableIndex,
      toVariableIndex: this.toVariableIndex,
      myValueIndex: this.myValueIndex,
      toValueIndex: this.toValueIndex
    })
  }

  compare(connection) {
    return (
      connection.myStoneInstance == this.myStoneInstance &&
      connection.toStoneInstance == this.toStoneInstance &&
      connection.myVariableIndex == this.myVariableIndex &&
      connection.toVariableIndex == this.toVariableIndex &&
      connection.myValueIndex == this.myValueIndex &&
      connection.toValueIndex == this.toValueIndex
    )
  }

  serialize() {
    // console.log(`serializing connection`)
    // console.log(this.toStoneInstance.id)
    // console.log(this.myStoneInstance.id)
    return {
      toStoneInstanceId: this.toStoneInstance.id,
      myVariableIndex: this.myVariableIndex,
      toVariableIndex: this.toVariableIndex,
      myValueIndex: this.myValueIndex,
      toValueIndex: this.toValueIndex
    }
  }
  static Deserialize({ data, myStoneInstance, stoneInstanceList }) {
    return new Connection({
      myStoneInstance,
      toStoneInstance: stoneInstanceList.find(stoneInstance => {
        return stoneInstance.id == data.toStoneInstanceId
      }),
      myVariableIndex: data.myVariableIndex,
      toVariableIndex: data.toVariableIndex,
      myValueIndex: data.myValueIndex,
      toValueIndex: data.toValueIndex
    })
  }

  get isValid() {
    return this.isInputValid && this.isOutputValid
  }
  get isInputValid() {
    return Connection.CheckInputValidity(this)
  }
  get isOutputValid() {
    return Connection.CheckOutputValidity(this)
  }
  static CheckInputValidity(connection) {
    return (
      connection.myStoneInstance != null &&
      connection.myVariableIndex > -1 &&
      connection.myStoneInstance.outputVariables.length >
        connection.myVariableIndex &&
      connection.myValueIndex > -1 &&
      connection.myStoneInstance.outputVariables[connection.myVariableIndex]
        .length > connection.myValueIndex
    )
  }
  static CheckOutputValidity(connection) {
    return (
      connection.toStoneInstance != null &&
      connection.toVariableIndex > -1 &&
      connection.toStoneInstance.inputVariables.length >
        connection.toVariableIndex &&
      connection.toValueIndex > -1 &&
      connection.toStoneInstance.inputVariables[connection.toVariableIndex]
        .length > connection.toValueIndex
    )
  }

  apply() {
    if (this.isValid) {
      const myVariable = this.myStoneInstance.outputVariables[
        this.myVariableIndex
      ]
      const toVariable = this.toStoneInstance.inputVariables[
        this.toVariableIndex
      ]

      const myValue =
        myVariable.length == 1
          ? myVariable.value
          : myVariable.value[this.myValueIndex]

      if (toVariable.length > 1) {
        toVariable.value[this.toValueIndex] = myValue
      } else if (
        myVariable.type == StateVariable.Types.string &&
        toVariable.type == StateVariable.Types.number
      ) {
        toVariable.value = parseFloat(myValue)
      } else {
        toVariable.value = myValue
      }
    } else {
      console.warn('apply() called on incorrect connection')
    }
  }
}

export default Connection

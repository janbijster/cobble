import uuidv4 from 'uuid/v4'
import StoneInstance from './StoneInstance.js'
import Connection from './Connection.js'

// Cobble Project
// A project is a collection of stone instances with connections between state variables.

class Project {
  constructor({ name, id = null, stoneInstances = [] }) {
    this.name = name
    this.id = id == null ? uuidv4() : id
    this.stoneInstances = stoneInstances
  }

  toJson() {
    return JSON.stringify(this.serialize())
  }
  serialize() {
    console.log(`serializing project ${this.name}`)
    return {
      name: this.name,
      id: this.id,
      stoneInstances: this.stoneInstances.map(stoneInstance =>
        stoneInstance.serialize()
      )
    }
  }
  static Deserialize({ data, stoneList }) {
    let project = new Project({
      name: data.name,
      id: data.id,
      stoneInstances: data.stoneInstances.map(stoneInstanceData =>
        StoneInstance.Deserialize({ data: stoneInstanceData, stoneList })
      )
    })
    // set connections
    project.stoneInstances.forEach(stoneInstance => {
      stoneInstance.connections = stoneInstance.connectionsData.map(data =>
        Connection.Deserialize({
          data,
          myStoneInstance: stoneInstance,
          stoneInstanceList: project.stoneInstances
        })
      )
    })
    return project
  }
}

export default Project

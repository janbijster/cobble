import Project from './Project.js'
import builtInStones from '@/lib/cobbleCore/builtInStones/index.js'

const stoneList = Object.keys(builtInStones).map(k => builtInStones[k])

class ProjectList {
  constructor({ projects }) {
    this.projects = projects
  }

  toJson() {
    return JSON.stringify(this.serialize())
  }
  static FromJson(json) {
    return ProjectList.Deserialize({ data: JSON.parse(json) })
  }
  serialize() {
    return {
      projects: this.projects.map(project => project.serialize())
    }
  }
  static Deserialize({ data }) {
    return new ProjectList({
      projects: data.projects.map(projectData =>
        Project.Deserialize({ data: projectData, stoneList })
      )
    })
  }
  static ProjectFromJson(json) {
    return Project.Deserialize({ data: JSON.parse(json), stoneList })
  }
}

export default ProjectList

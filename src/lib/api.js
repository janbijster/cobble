import axios from 'axios'
const apiUrl = API_URL  // eslint-disable-line

export default {
  loadProjects({ username, password }) {
    let body = new FormData()
    body.set('username', username)
    body.set('password', password)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${apiUrl}/data.php`,
        data: body,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(response => {
          console.log(response)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  saveProjects({ username, password, data }) {
    let body = new FormData()
    body.set('username', username)
    body.set('password', password)
    body.set('data', data)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${apiUrl}/data.php`,
        data: body,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  publishProject(projectData, projectId) {
    let body = new FormData()
    body.set('data', projectData)
    body.set('project_id', projectId)
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: `${apiUrl}/publish.php`,
        data: body,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      })
        .then(response => {
          console.log(response)
          resolve(response)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  getPublishedProject() {
    return new Promise((resolve, reject) => {
      let id = getUrlVars()['id']
      if (id != null) {
        axios
          .get(`${apiUrl}/getPublished.php?id=${id}`)
          .then(function(response) {
            console.log(response)
            resolve(response)
          })
          .catch(function(error) {
            console.log(error)
            reject(error)
          })
      } else {
        reject()
      }
    })
  }
}

function getUrlVars() {
  let vars = {}
  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value
  })
  return vars
}

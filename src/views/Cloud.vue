<template>
  <div class="cloud">
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <b-button
          class="cloud-button cloud-back-button theme-orange mar-right-sm"
          @click="$router.push('/')"
        >
          <b-icon icon="chevron-left" size="is-small"></b-icon>
          <span class="mar-left-sm">Back</span>
        </b-button>
        <div class="cloud-title">
          Cloud
        </div>
        <b-button
          class="cloud-button cloud-new-project-button theme-red mar-left-sm"
          @click="newProject"
        >
          <b-icon icon="close" size="is-small"></b-icon>
          <span class="mar-left-sm">New project</span>
        </b-button>
        <input
          class="cloud-input input-project-name"
          v-model="currentProject.name"
          inline
        />
        <div class="project-name">
          Project name
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-offset-2 is-4">
        <div class="column-title"></div>
        <div class="load-projects cloud-window">
          <b-input
            class="cloud-input cloud-load-username"
            v-model="username"
            placeholder="username"
            expanded
          />
          <b-input
            class="cloud-input cloud-load-password"
            type="password"
            v-model="password"
            placeholder="password"
            expanded
          />
        </div>
        <div class="loaded-projects"></div>
      </div>
      <div class="column is-4">
        <div class="column-title"></div>
        <div class="save-projects cloud-window">
          <b-button
            :class="[
              'button cloud-button mar-right-sm',
              hasStones ? 'theme-orange' : 'theme-blue'
            ]"
            @click="saveCheck"
            expanded
          >
            <b-icon icon="upload" size="is-small"></b-icon>
            <span class="mar-left-sm">Save project</span>
          </b-button>
          <b-button
            class="button cloud-button theme-green mar-right-sm"
            @click="load"
            expanded
          >
            <b-icon icon="download" size="is-small"></b-icon>
            <span class="mar-left-sm">Load projects</span>
          </b-button>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-8 is-offset-2">
        <div
          v-if="message"
          :class="['cloud-message', success ? 'theme-green' : 'theme-red']"
        >
          {{ message }}
        </div>
        <div class="project-list" v-if="projectList">
          <div
            v-for="(project, index) in projectList.projects"
            :key="index"
            :class="[
              'project-listing',
              project.id == currentProject.id ? 'selected' : ''
            ]"
            @click="openProject(project)"
          >
            {{ project.name }}
          </div>
        </div>
        <b-button
          v-if="currentProject"
          class="button publish-button cloud-button theme-green mar-right-sm"
          @click="publish"
          expanded
        >
          <b-icon icon="share" size="is-small"></b-icon>
          <span class="mar-left-sm">Publish current project</span>
        </b-button>
        <div v-if="publishLink" class="cloud-message published-message">
          Project is published at
          <a :href="publishLink" target="_blank">{{ publishLink }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api.js'
import Cobble from '@/lib/cobbleCore/cobbleCore.js'

const runUrl = RUN_URL // eslint-disable-line

export default {
  data() {
    return {
      username: null,
      password: null,
      data: null,
      message: null,
      success: true,
      projectList: null,
      publishLink: null
    }
  },
  methods: {
    openProject(project) {
      if (
        confirm(
          'Open this project? Unsaved changes to your current project will be lost.'
        )
      ) {
        this.$store.commit('editor/openProject', project)
      }
    },
    newProject() {
      if (
        confirm(
          'Start new project? Unsaved changes to your current project will be lost.'
        )
      ) {
        this.$store.commit('editor/newProject')
      }
    },
    saveCheck() {
      if (!this.hasStones) {
        return
      }
      // first check if the user has saved projects:
      this.load()
        .then(() => {
          // see if the current project is already in it:
          let projectIndex = this.projectList.projects.findIndex(project => {
            return project.id == this.currentProject.id
          })
          if (projectIndex > -1) {
            // yes, overwrite
            this.$set(
              this.projectList.projects,
              projectIndex,
              this.currentProject
            )
          } else {
            // no, add it
            this.projectList.projects.push(this.currentProject)
          }
          this.save()
        })
        .catch(() => {
          // no projectlist
          this.projectList = new Cobble.ProjectList({
            projects: [this.currentProject]
          })
          this.save()
        })
    },
    publish() {
      api
        .publishProject(this.currentProject.toJson(), this.currentProject.id)
        .then(response => {
          console.log(response.data.data)
          this.message = `Project published with id ${response.data.data.id}`
          this.success = response.data.success
          this.publishLink = `${runUrl}?id=${response.data.data.id}`
        })
        .catch(error => {
          this.message = error
          this.success = false
        })
    },
    save() {
      // then save for real
      api
        .saveProjects({
          username: this.username,
          password: this.password,
          data: this.projectList.toJson()
        })
        .then(response => {
          this.message = response.data.message
          this.success = response.data.success
        })
        .catch(error => {
          this.message = error
          this.success = false
        })
    },
    load(supressError) {
      return new Promise((resolve, reject) => {
        api
          .loadProjects({
            username: this.username,
            password: this.password
          })
          .then(response => {
            this.message = response.data.message
            this.success = response.data.success
            if (this.success) {
              this.projectList = Cobble.ProjectList.FromJson(response.data.data)
              resolve()
            } else {
              reject(new Error(this.message))
            }
          })
          .catch(error => {
            this.success = false
            if (!supressError) {
              this.message = error
            }
            reject(error)
          })
      })
    }
  },
  computed: {
    currentProject() {
      return this.$store.getters['editor/getProject']
    },
    hasStones() {
      return this.currentProject.stoneInstances.length > 0
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/variables.scss';

.cloud {
  margin: 30px 20px 20px;
}
.cloud-title {
  display: inline-block;
  vertical-align: middle;
  color: $blue-extra-light;
  margin-left: 10px;
}
.cloud-back-button {
  vertical-align: middle !important;
}
.project-name {
  margin: 7px 10px 0 0;
  float: right;
}
.input-project-name {
  width: 200px;
  float: right;
}
.cloud-new-project-button {
  float: right;
}
.cloud-input,
.cloud-button {
  margin-bottom: 5px;
}
.cloud-input input,
.input-project-name {
  background: $blue-extra-light;
  color: $blue-extra-dark;
  box-shadow: none;
  border: none;
}
.cloud-message {
  text-align: center;
  padding: 5px;
  border-radius: 5px;
}
.project-list {
  background: $blue-dark;
  padding: 10px;
  border-radius: 5px;
}
.project-listing {
  background: $blue-light;
  padding: 10px;
  border-radius: 5px;
}
.project-listing:not(:last-child) {
  margin-bottom: 5px;
}
.project-listing.selected {
  border: 1px solid $blue-extra-light;
}
.cloud-message.published-message {
  background-color: $blue-extra-dark;
  color: $blue-light;
}
.publish-button {
  margin: 10px 0;
}
.publish-message a {
  color: $blue-extra-light;
}
</style>

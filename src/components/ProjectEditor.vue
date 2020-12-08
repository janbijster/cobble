<template>
  <div class="project-editor window theme-dark">
    <cobble-field />
  </div>
</template>

<script>
import CobbleField from '@/components/CobbleField'

export default {
  name: 'ProjectEditor',
  components: {
    CobbleField
  }
}
</script>

<style>
.columns {
  height: 100%;
}
</style>

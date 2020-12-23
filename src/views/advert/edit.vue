<template>
  <div class="course-create">
    <create-or-update
      is-edit
      :advert-id="advertId"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'

export default Vue.extend({
  name: 'advertEdit',
  props: {
    advertId: {
      type: [String, Number]
    }
  },
  components: {
    CreateOrUpdate
  }
})
</script>

<style lang="scss" scoped>
</style>

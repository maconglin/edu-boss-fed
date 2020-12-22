<template>
  <div class="adverCreate">
    <create-or-update />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdate from './components/CreateOrUpdate.vue'
export default Vue.extend({
  name: 'adverCreateIndex',
  components: {
    CreateOrUpdate
  },
  data () {
    return {
    }
  }
})
</script>

<style>

</style>

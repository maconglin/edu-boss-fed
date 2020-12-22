<template>
  <div class="advert">
    <adver-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AdverList from './components/AdverList.vue'

export default Vue.extend({
  name: 'AdvertIndex',
  components: {
    AdverList
  }
})
</script>

<style lang="scss" scoped></style>

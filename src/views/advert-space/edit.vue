<template>
  <div class="adver-create">
    <el-card>
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="广告位名称" required>
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSpaceById, spaceSaveOrUpdate } from '@/services/adver'
export default Vue.extend({
  name: 'advertEdit',
  components: {
  },
  data () {
    return {
      form: {
        name: ''
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.loadUpdate()
    } else {
      console.log('等于空')
    }
  },
  methods: {
    async onSubmit () {
      await spaceSaveOrUpdate(this.form)
      this.$router.push({ name: 'advert-space' })
    },
    async loadUpdate () {
      const { data } = await getSpaceById(this.$route.query.id)
      this.form = data.content
    }
  }
})
</script>

<style lang="scss" scoped>
</style>

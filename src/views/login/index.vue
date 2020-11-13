<template>
  <div class="login">
  <div style="margin: 20px"></div>
  <el-form
    class="login-form"
    label-position="top"
    label-width="80px"
    ref="form"
    :model="form"
    :rules="rules"
  >
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item label="密码"  prop="password" >
      <el-input v-model="form.password" show-password  type="password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-button type="primary" class="login-btn" :loading="isLogInLoarding" @click="onSubmit('form')">登录</el-button>
  </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/services/user'
export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在6 到 18 个字符', trigger: 'blur' }
        ]
      },
      isLogInLoarding: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 表单验证
        await (this.$refs.form as Form).validate()
        // 登录展示loading
        this.isLogInLoarding = true
        // 2验证通过 -> 提交表单
        const { data } = await login(this.form)
        // 3处理请求链接
        //   失败给出提示
        if (data.state !== 1) {
          this.$message.error(data.message)
        } else {
          // 登录成功,记录登录状态存到vuex容器中全局访问
          this.$store.commit('setUser', data.content)
          // 4成功跳转首页
          this.$router.push(this.$route.query.path as string || '/')
          // this.$router.push({
          //   name: 'home'
          // })
          this.$message.success('登录成功')
        }
      } catch (error) {
        console.log('登录失败' + error)
      }
      // 结束登录按钮loading
      this.isLogInLoarding = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 300px;
    background: #fff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>

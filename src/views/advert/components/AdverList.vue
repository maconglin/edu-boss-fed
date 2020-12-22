<template>
  <div class="course-list">
    <el-card>
      <div slot="header">
       <el-button  @click="$router.push({ name: 'advert-create'})">添加广告</el-button>
      </div>
      <el-form ref="form" :model="adverForm" label-width="80px">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="id"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="广告名称"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="spaceId"
            label="广告位置"
            align="center"
          >
            <template slot-scope="scope">
              <!-- <span>{{scope.row.spaceId}}</span> -->
              <p v-for="item in getAllSpace" :key="item.id">
                {{scope.row.spaceId === item.id ? item.name : ''}}
              </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="img"
            label="广告图片"
            width="80px"
            align="center"
            >
            <template slot-scope="scope">
              <img width="50px" height="50px" :src="scope.row.img">
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="时间"
            align="center"
            >
            <template slot-scope="scope">
              <p>开始时间: {{scope.row.startTime | date('YYYY/MM/DD hh:mm:ss') }}</p>
              <p>结束时间: {{scope.row.endTime| date('YYYY/MM/DD hh:mm:ss') }} </p>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="上线/下线"
            align="center"
            width="100px"
          >
          <template  slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStatusLoading"
              @change="onStateChange(scope.row)"
            />
          </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作"
            width="100px"
            align="center"
            >
            <template>
              <el-button  type="text">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdver, getAllSpaces, updateStatus } from '@/services/adver'
export default Vue.extend({
  name: 'AdverList',
  data () {
    return {
      adverForm: {
        id: '',
        name: '',
        spaceId: 0,
        keyword: '',
        htmlContent: '',
        text: '',
        img: '',
        link: '',
        startTime: '',
        endTime: '',
        createTime: '',
        updateTime: '',
        status: 0,
        priority: 0,
        startTimeFormatString: '',
        endTimeFormatString: ''
      },
      tableData: [],
      getAllSpace: []
    }
  },
  created () {
    this.getAdverList()
    this.getAllSpaces()
  },
  methods: {
    async getAdverList () {
      const { data } = await getAdver(this.adverForm)
      this.tableData = data.content
    },
    async getAllSpaces () { // 获取广告位
      const { data } = await getAllSpaces()
      this.getAllSpace = data.content
    },
    async onStateChange (course: any) {
      this.$confirm('是否要修改上线/下线状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        updateStatus({
          id: course.id,
          status: course.status
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
        this.getAdverList()
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 20px;
}
</style>

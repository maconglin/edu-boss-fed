<template>
  <div class="advert-space">
    <el-card>
      <div slot="header">
        <el-button @click="open">添加广告位</el-button>
      </div>
      <el-form ref="form" :model="adverForm" label-width="80px">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="spaceKey"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="广告位名称"
            width="180"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            align="center"
            >
            <template slot-scope="scope">
              <p>{{scope.row.startTime | date('YYYY/MM/DD hh:mm:ss') }}</p>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="更新时间"
            align="center"
            >
            <template slot-scope="scope">
              <p>{{scope.row.endTime| date('YYYY/MM/DD hh:mm:ss') }} </p>
            </template>
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            width="100px"
            align="center"
            >
            <template slot-scope="scope">
              <el-button  type="text"
              @click="handleClick(scope.row.id)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllSpaces } from '@/services/adver'
export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      adverForm: {
        id: 0,
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
      tableData: []
    }
  },
  created () {
    this.getAllSpaces()
  },
  methods: {
    async getAllSpaces () {
      const { data } = await getAllSpaces()
      const { content } = data
      this.tableData = content
    },
    open () {
      this.$router.push({ name: 'advert-space-edit' })
    },
    handleClick (dev: any) {
      this.$router.push({ name: 'advert-space-edit', query: { id: dev } })
    }
  }
})
</script>

<style lang="scss" scoped></style>

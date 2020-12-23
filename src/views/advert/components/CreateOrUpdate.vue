<template>
  <div class="adverCreate">
    <el-card>
      <el-form ref="form" :model="promotionAdDTO" label-width="90px">
      <el-form-item label="广告名称" required>
        <el-input v-model="promotionAdDTO.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位置">
        <el-select v-model="promotionAdDTO.spaceId" placeholder="请选择">
          <el-option
            v-for="item in roles"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" required>
        <el-date-picker
          v-model="promotionAdDTO.startTime"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="结束时间" required>
        <el-date-picker
          v-model="promotionAdDTO.endTime"
          type="date"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="上线/下线" required>
        <el-radio-group v-model="promotionAdDTO.status">
          <el-radio label="上线" value="1"></el-radio>
          <el-radio label="下线" value="0"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片" >
          <course-image
            v-model="promotionAdDTO.img"
            :limit="5"
          />
      </el-form-item>
      <el-form-item label="广告链接" required>
        <el-input v-model="promotionAdDTO.link"></el-input>
      </el-form-item>
      <el-form-item label="广告备注">
        <el-input type="textarea" v-model="promotionAdDTO.text"></el-input>
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
import CourseImage from '@/views/course/components/CourseImage.vue'
import { saveOrUpdates, getAllSpaces, getAdById } from '@/services/adver'
export default Vue.extend({
  name: 'CreateOrUpdate',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    advertId: {
      type: [String, Number]
    }
  },
  components: {
    CourseImage
  },
  data () {
    return {
      promotionAdDTO: {
        id: '',
        name: '',
        spaceId: '',
        keyword: '',
        htmlContent: '',
        text: '',
        img: '',
        link: '',
        startTime: '',
        endTime: '',
        createTime: '',
        updateTime: '',
        status: 1,
        priority: 0,
        startTimeFormatString: '',
        endTimeFormatString: ''
      },
      roles: []
    }
  },
  methods: {
    async onSubmit () {
      const { data } = await saveOrUpdates(this.promotionAdDTO)
      console.log('data: ', data)
    },
    async getAllSpaces () {
      const { data } = await getAllSpaces()
      this.roles = data.content
    },
    async loadAdver () {
      const { data } = await getAdById(this.advertId)
      this.promotionAdDTO = data.data
    }
  },
  created () {
    this.getAllSpaces()
    if (this.isEdit) {
      this.loadAdver()
    }
  }
})
</script>

<style>

</style>

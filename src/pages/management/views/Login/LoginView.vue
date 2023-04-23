<template>
  <div id="login">
    <el-form :model="formInline" class="form">
      <el-form-item label="用户名">
        <el-input v-model="formInline.user" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码">
        <el-select v-model="formInline.region" placeholder="请输入密码">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const formInline = reactive({
  user: "",
  region: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style lang="less" scoped>
#login {
  width: 500px;
}
</style>

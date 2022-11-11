<template>
  <el-row>
    <el-col :span="4">
      <h5 class="mb-2">个人站后台管理</h5>
      <el-menu
        default-active="2"
        class="el-menu-vertical"
        @open="handleOpen"
        @close="handleClose"
        @select="handleSelect"
      >
        <el-menu-item index="/managementIndex">
          <el-icon><icon-menu /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/user">用户管理</el-menu-item>
          <el-menu-item index="/blog">博客管理</el-menu-item>
          <el-menu-item index="/tag">标签管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col :span="20"><router-view /></el-col>
  </el-row>
</template>
<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

const handleSelect = (key: string, keyPath: string[]) => {
  console.log("select", key);
  key.includes("/") ? router.push(key) : 0;
};
</script>

<style lang="less" scoped>
.mb-2 {
  padding: 10px;
  font-size: 18px;
  border-right: solid 1px var(--el-menu-border-color);
}

.el-menu-vertical {
  height: calc(100% - 45px);
}
</style>

<template>
  <el-row>
    <el-col :span="!isCollapse ? 4 : 1">
      <el-menu
        :unique-opened="true"
        default-active="2"
        :default-openeds="[2]"
        class="el-menu-vertical"
        @select="handleSelect"
        :collapse="isCollapse"
      >
        <h5 class="mb-2">
          <el-icon size="20" color="red"><Monitor /></el-icon>
          <span v-show="!isCollapse">个人站后台管理系统</span>
        </h5>
        <el-menu-item index="/management">
          <el-icon><HomeFilled /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/management/user">用户管理</el-menu-item>
          <el-menu-item index="/management/blog">博客管理</el-menu-item>
          <el-menu-item index="/management/tags">标签管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
    <el-col :span="!isCollapse ? 20 : 23">
      <div id="userContainerHeader">
        <div>
          <el-icon
            v-if="!isCollapse"
            :size="iconSize"
            :color="iconColor"
            @click="isCollapse = !isCollapse"
            ><Fold
          /></el-icon>
          <el-icon
            v-else
            :size="iconSize"
            :color="iconColor"
            @click="isCollapse = !isCollapse"
            ><Expand
          /></el-icon>
        </div>
        <div>
          <el-icon :size="iconSize" :color="iconColor"><Avatar /></el-icon>
        </div>
      </div>
      <router-view />
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter();

const iconSize = 20;
const iconColor = "#999";
let isCollapse = ref(false); // 默认打开

const handleSelect = (key: string) => {
  key.includes("/") ? router.push(key) : 0;
};
</script>

<style lang="less" scoped>
.mb-2 {
  padding: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  span {
    padding-left: 8px;
  }
}

.el-menu-vertical {
  height: calc(100% - 45px);
}

#userContainerHeader {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>

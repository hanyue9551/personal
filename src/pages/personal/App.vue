<template>
  <el-container id="app">
    <el-header>
      <LayoutMenu></LayoutMenu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import LayoutMenu from "./LayoutMenu/LayoutMenu.vue";
</script>

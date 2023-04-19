<template>
  <div id="container">
    <div class="container_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/management/blog' }"
          >博客管理</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
  </div>
</template>

<style lang="less" scoped>
.el-container {
  padding: 10px;
}
</style>

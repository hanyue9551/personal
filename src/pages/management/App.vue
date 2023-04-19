<template>
  <router-view id="management"></router-view>
</template>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  .el-header {
    padding: 0;
  }
}

#management {
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
}

#container {
  padding: 20px;
  .container_breadcrumb {
    padding: 0 0 20px 0;
  }
}
</style>

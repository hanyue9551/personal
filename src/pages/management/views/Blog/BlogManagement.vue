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
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column prop="id" label="ID" sortable width="70" />
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="user" label="作者"></el-table-column>
      <el-table-column prop="classification" label="文章分类"></el-table-column>
      <el-table-column prop="view" label="浏览次数"></el-table-column>
      <el-table-column
        label="创建时间"
        width="180"
        sortable
        :sort-method="sortDate"
        :formatter="formatterDate"
      >
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div>
            <!-- <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row.name)"
              >编辑</el-button
            > -->
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { formatUtcString, formatValueOf } from "../../utils/dayjs";
import type { TableColumnCtx } from "element-plus";

interface Blog {
  id: number;
  title: string;
  user: string;
  time: string;
  view: number;
  classification: string;
  isPublished: boolean;
  isEdit?: boolean;
}

let tableData: Blog[] = reactive([
  {
    id: 1,
    title: "震惊! 有个男人叫小帅...",
    user: "小韩",
    time: "1681931036000",
    view: 13,
    classification: "笔记",
    isPublished: true,
  },
]);

let formatterDate = (row: Blog, columns: TableColumnCtx<Blog>) => {
  return formatUtcString(row.time);
};

const sortDate = (a: string, b: string) => formatValueOf(a) - formatValueOf(b);

tableData.forEach((item: Blog) => {
  item.isEdit = false;
});

// let input = ref("");

// const handleEdit = (index: number, name: string) => {
//   input.value = name;
//   tableData[index].isEdit = true;
// };

const handleDelete = (index: number) => {
  tableData.splice(index, 1);
};
</script>

<style lang="less" scoped>
.el-container {
  padding: 10px;
}
</style>

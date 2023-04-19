<template>
  <div id="container">
    <div class="container_breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/management/user' }"
          >用户管理</el-breadcrumb-item
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
      <el-table-column prop="id" label="ID" sortable width="180" />
      <el-table-column prop="name" label="用户名称">
        <template #default="scope">
          <span v-show="!scope.row.isEdit">{{ scope.row.name }}</span>
          <div v-show="scope.row.isEdit">
            <el-input v-model="input" autofocus placeholder="请修改用户名称" />
            <el-alert
              title="请输入2至10位的名称(汉字,字母,下划线,减号,数字, 开头结尾不为-_)"
              type="error"
              :closable="false"
              v-show="scope.row.isInput"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        width="180"
        sortable
        :sort-method="sortDate"
        :formatter="formatterDate"
      >
      </el-table-column>
      <el-table-column label="操作权限" width="180">
        <template #default="scope">
          <el-tag
            v-for="item in scope.row.tags"
            :key="item"
            :type="item === 0 ? '' : item === 1 ? 'danger' : 'success'"
            >{{
              item === 0 ? "可编辑" : item === 1 ? "可删除" : "可阅读"
            }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <div v-show="!scope.row.isEdit">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row.name)"
              v-if="isTagsTwo(scope.$index)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index)"
              v-if="scope.row.id != 1"
              >删除</el-button
            >
          </div>
          <div v-show="scope.row.isEdit">
            <el-button
              size="small"
              @click="handleSubmit(scope.$index, scope.row.name)"
              >提交</el-button
            >
            <el-button size="small" @click="handleCancle(scope.$index)"
              >取消</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { formatUtcString, formatValueOf } from "../../utils/dayjs";
import type { TableColumnCtx } from "element-plus";

interface User {
  id: number;
  name: string;
  tags: Array<number>;
  time: string;
  isEdit?: boolean;
  isInput?: boolean;
}

let tableData: User[] = reactive([
  {
    id: 1,
    name: "Admin",
    tags: [0, 1],
    time: "1681931036000",
  },
  {
    id: 2,
    name: "小韩",
    tags: [0, 2],
    time: "1681929321237",
  },
  {
    id: 3,
    name: "Tom",
    tags: [2],
    time: "1681929321237",
  },
  {
    id: 4,
    name: "Tom",
    tags: [0, 2],
    time: "1681929321237",
  },
]);

let formatterDate = (row: User, columns: TableColumnCtx<User>) => {
  return formatUtcString(row.time);
};

const sortDate = (a: string, b: string) => formatValueOf(a) - formatValueOf(b);

tableData.forEach((item: User) => {
  item.isEdit = false;
});

let input = ref("");

const handleEdit = (index: number, name: string) => {
  input.value = name;
  tableData[index].isEdit = true;
  tableData[index].isInput = false;
};

const isTagsTwo = (index: number) => {
  return tableData[index].tags.indexOf(0) !== -1;
};

const handleDelete = (index: number) => {
  tableData.splice(index, 1);
};

const handleSubmit = (index: number, name: string) => {
  const namePattern = /^(?!(-|_))[\w(\u4e00-\u9fa5)-]{2,10}(?<!(-|_))$/;
  input.value.trim();
  input.value = input.value === "" ? name : input.value;
  if (input.value === "" || !namePattern.test(input.value)) {
    tableData[index].isInput = true;
  } else {
    tableData[index].name = input.value;
    tableData[index].isEdit = false;
    input.value = "";
  }
};

const handleCancle = (index: number) => {
  tableData[index].isEdit = false;
};
</script>

<style lang="less" scoped>
.el-container {
  padding: 10px;
}

.el-tag {
  margin-left: 5px;
}

.el-tag:nth-of-type(1) {
  margin-left: 0;
}
</style>

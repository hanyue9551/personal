<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      :size="formSize"
      status-icon
      id="login"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input v-model="ruleForm.pwd" placeholder="请输入密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">
          登录
        </el-button>
        <el-button @click="onRgesiter"> 注册 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { FormInstance, FormRules } from "element-plus";
import { request } from "@/api";

const route = useRoute();
const router = useRouter();

const formSize = ref("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  name: "",
  pwd: "",
});

const validateName = (rule: any, value: any, callback: any) => {
  const namePattern = /^(?!(-|_))[\w(\u4e00-\u9fa5)-]{2,10}(?<!(-|_))$/;

  if (value === "") {
    callback(new Error("请输入用户名"));
  } else if (!namePattern.test(value)) {
    callback(
      new Error(
        "请输入2至10位的名称(汉字,字母,下划线,减号,数字, 开头结尾不为-_)"
      )
    );
  } else {
    callback();
  }
};

const validatePwd = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  name: [{ validator: validateName, trigger: "blur" }],
  pwd: [
    {
      validator: validatePwd,
      trigger: "blur",
    },
  ],
});

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      request
        .post("/login", {
          username: encodeURIComponent(ruleForm.name),
          password: encodeURIComponent(ruleForm.pwd),
        })
        .then((res) => {
          if (res.code === 1) {
            router.push("/management");
          }
        })
        .catch((res) => {
          console.log(res, "错误");
        });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const onRgesiter = () => {
  console.log("注册");
};
</script>

<style lang="less" scoped>
#login {
  width: 500px;
  position: relative;
  top: calc(40%);
  left: calc(50% - 280px);
}
</style>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      id="register"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model.number="ruleForm.name" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input
          v-model="ruleForm.pwd"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
          placeholder="请再次输入密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >注册</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
import { request } from "@/api";
import { ElMessage } from "element-plus";
import { Md5 } from "ts-md5";

const router = useRouter();

const ruleFormRef = ref<FormInstance>();

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

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleForm.pwd) {
    callback(new Error("两次密码输入不一致!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  pwd: "",
  checkPass: "",
  name: "",
});

const rules = reactive<FormRules>({
  pwd: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  name: [{ validator: validateName, trigger: "blur" }],
});
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      request
        .post("/register", {
          username: ruleForm.name,
          password: Md5.hashStr(ruleForm.pwd),
        })
        .then((res) => {
          if (res.code === 1) {
            router.push("/login");
          }
        })
        .catch((res) => {
          if (res.code === 2) {
            ElMessage({
              message: res.message,
              type: "warning",
            });
          } else {
            ElMessage.error(res.code);
          }
          console.log(res, "错误");
        });
      // router.push("/login");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="less" scoped>
#register {
  width: 500px;
  position: relative;
  top: calc(40%);
  left: calc(50% - 280px);
}
</style>

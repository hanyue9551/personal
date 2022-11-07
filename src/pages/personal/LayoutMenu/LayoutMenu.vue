<!-- eslint-disable vue/no-export-in-script-setup -->
<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="/han">Han</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/">{{ $t("menu.home") }}</el-menu-item>
    <el-menu-item index="/me">{{ $t("menu.aboutme") }}</el-menu-item>
    <div ref="buttonRef" v-click-outside="onClickOutside" class="language">
      {{ $t("menu.language") }}
    </div>
    <el-popover
      ref="popoverRef"
      :virtual-ref="buttonRef"
      trigger="click"
      virtual-triggering
    >
      <div @click="onChangeLang('zh')">{{ $t("menu.zh") }}</div>
      <div @click="onChangeLang('jp')">{{ $t("menu.jp") }}</div>
    </el-popover>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, unref } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
import { useLangStore } from "../store/state";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";

const activeIndex = ref("/");
const router = useRouter();
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
  router.push(key);
};

const buttonRef = ref();
const popoverRef = ref();
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};

const store = useLangStore();
const { locale } = useI18n();

const onChangeLang = (lang: string) => {
  locale.value = lang;
  sessionStorage.setItem("localLang", lang);
  store.updateLang(lang);
};
</script>

<style lang="less">
.flex-grow {
  flex-grow: 1;
}

.language {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid transparent;
}
</style>

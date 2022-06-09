<template>
  <div class="user">
    <div class="search">
      <hy-form :formItems="formItems"></hy-form>
    </div>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HyForm, { IFormItem } from '../../../../base-ui/form'

export default defineComponent({
  components: {
    HyForm
  },
  name: 'user',
  setup() {
    const formItems: IFormItem[] = [
      {
        field: '',
        type: 'input',
        label: '用户名',
        placeholder: '请输入用户名'
      }
    ]
    return { formItems }
  }
})
</script>

<style scoped></style>

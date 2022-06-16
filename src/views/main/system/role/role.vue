<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '../../../../components/page-content'
import pageSearch from '../../../../components/page-search'
import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
export default defineComponent({
  name: 'role',
  components: {
    pageSearch,
    pageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>

<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p>{{ buttonStyles }}</p>
    <Suspense>
      <template v-slot:default>
        <Timeline />
      </template>
      <template v-slot:fallback>
        Loading...
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Timeline from '@/components/Timeline.vue'

export default defineComponent({
  name: 'App',
  components: {
    Timeline
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

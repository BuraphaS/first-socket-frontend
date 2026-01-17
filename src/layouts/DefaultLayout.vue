<template>
  <div class="app-layout">
    <main class="content">
      <router-view />
    </main>

    <footer class="footer">
      <!-- Powered By Burapha.S -->
    </footer>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.app-layout {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.footer {
  text-align: center;
  padding: 12px;
  color: #888;
  font-size: 14px;
}
</style>

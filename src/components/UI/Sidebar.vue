<template>
  <nav :class="{'closed': !state}" id="sidebar">
    <div class="sidebar-header pl-3 mt-3">
      <h3 class="font-weight-light">Todo App</h3>
    </div>
    <div class="sidebar-body pl-3">
      <div class="sidebar-toggler">
        <a @click="$emit('toggle')" href="javascript:void(0)">
          <i class="fa fa-angle-left fa-2x"></i>
        </a>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    state: {
      default: true,
      type: Boolean,
    },
  },
};
</script>
<style scoped>
#sidebar {
  min-width: 300px;
  max-width: 300px;
  background: #ecf0f1;
  transition: all 0.3s;
  min-height: 100vh;
}

#sidebar.closed {
  margin-left: -300px;
}
</style>
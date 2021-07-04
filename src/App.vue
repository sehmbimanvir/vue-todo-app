<template>
  <div class="d-flex align-items-stretch w-100">
    <div v-if="!sidebarState" class="sidebar-toggler position-absoulute">
      <a @click="toggleSidebar" href="javascript:void(0);">
        <i class="fa fa-angle-right fa-2x"></i>
      </a>
    </div>
    <!-- Sidebar  -->
    <Sidebar :state="sidebarState" @toggle="toggleSidebar" />
    <!-- Page Content  -->
    <div class="content w-100 p-3">
      <!-- <Search /> -->
      <TaskContainer />
    </div>
  </div>
</template>

<script>
import "./App.css";
import Sidebar from "./components/UI/Sidebar.vue";
import TaskContainer from "./components/Tasks/Index.vue";

export default {
  name: "App",
  components: {
    Sidebar,
    TaskContainer,
  },
  data() {
    return {
      sidebarState: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarState = !this.sidebarState;
    },
  },
};
</script>
<style scoped>
.sidebar-toggler {
  position: absolute;
  left: 20px;
  top: 10px;
  z-index: 999;
}
</style>
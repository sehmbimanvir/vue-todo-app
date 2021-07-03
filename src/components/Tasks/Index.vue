<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="day-details mt-4">
          <h4 class="title mb-1">All Tasks</h4>
          <small>{{format(Date.now(), 'EEEE, do MMMM')}}</small>
        </div>
        <TaskInput v-model="task" @add="onAddTask" />
        <TaskList :actions="true" title="Pending Tasks" @edit="onEditTask" @toggle="toggle" @remove="remove" :tasks="pendingTasks" />
        <TaskList title="Finished Tasks" @edit="onEditTask" @toggle="toggle" @remove="remove" :tasks="finishedTasks" />
      </div>
    </div>
    <!-- <TaskContainer /> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TaskInput from "./TaskInput.vue";
import TaskList from "./TaskList.vue";
import { format } from "date-fns";

export default {
  components: {
    TaskInput,
    TaskList,
  },
  data() {
    return {
      format,
      task: {
        id: 0,
        title: "",
      },
    };
  },
  methods: {
    onAddTask() {
      const { id, title } = this.task;
      id ? this.update({ id, title }) : this.add(title);
      this.task = {
        id: 0,
        title: "",
      };
    },
    onEditTask({ id, title }) {
      this.task = {
        id,
        title,
      };
    },
    ...mapActions(["add", "remove", "update", "toggle"]),
  },
  computed: {
    ...mapGetters(["tasks", "pendingTasks", "finishedTasks"]),
  },
};
</script>
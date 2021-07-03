<template>
  <div v-if="tasks.length" class="mt-4">
    <div v-if="title" class="d-flex justify-content-between">
      <h5>{{title}}</h5>
      <button @click="deleteSelected" v-if="actions && enableDeletebtn" class="btn btn-sm btn-danger" type="button">Delete Selected</button>
    </div>
    <div class="task-list mt-2">
      <ul class="list-group">
        <li v-for="(task, index) in tasks" :key="index" class="list-group-item border-bottom px-1 py-2">
          <div class="d-flex justify-content-between">
            <div class="form-check">
              <input :disabled="task.status" class="form-check-input" type="checkbox" v-model="statusList[index]" :id="'checkbox-' + task.id" />
              <label class="form-check-label" :for="'checkbox-' + task.id">
                <p class="mb-0" :class="{'text-strike': task.status}">{{task.title}}</p>
                <p class="mb-0">
                  <small class="font-weight-bold">Added On {{format(task.id, 'do, MMMM, HH:mm:ss')}}</small>
                </p>
              </label>
            </div>
            <div class="task-actions">
              <a v-if="!task.status" @click="$emit('toggle', task.id)" title="Mark As Complete" href="javascript:void(0)" class="text-success mr-2">
                <i class="fa fa-check fa-lg"></i>
              </a>
              <a v-else @click="$emit('toggle', task.id)" title="Mark As Incomplete" href="javascript:void(0)" class="text-danger mr-2">
                <i class="fa fa-close fa-lg"></i>
              </a>
              <a @click="$emit('edit', task)" title="Edit" href="javascript:void(0)" class="text-warning mr-2">
                <i class="fa fa-pencil fa-lg"></i>
              </a>
              <a @click="$emit('remove', [task.id])" title="Delete" href="javascript:void(0)" class="text-danger">
                <i class="fa fa-trash fa-lg"></i>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { format } from "date-fns";
export default {
  props: {
    tasks: {
      required: true,
      default: [],
    },
    title: String,
    actions: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      format,
      statusList: [],
    };
  },
  methods: {
    deleteSelected() {
      const taskIds = this.tasks
        .filter((task, index) => this.statusList[index])
        .map((task) => task.id);
      this.$emit("remove", taskIds);
    },
  },
  computed: {
    enableDeletebtn() {
      return this.statusList.some((status) => status);
    },
  },
  mounted() {
    this.statusList = new Array(this.tasks.length).fill(false);
  },
  watch: {
    tasks(newVal) {
      this.statusList = new Array(newVal.length).fill(false);
    },
  },
};
</script>
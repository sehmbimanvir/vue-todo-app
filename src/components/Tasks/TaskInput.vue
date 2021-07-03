<template>
  <div class="task-input mt-3">
    <form @submit.prevent="$emit('add', inputVal)" method="post">
      <div class="input-group border-bottom mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-plus-square-o"></i>
          </span>
        </div>
        <input required :value="modelValue.title" @input="update('title', $event.target.value)" ref="taskRef" type="text" class="form-control border-0" placeholder="Add Task" />
        <div v-if="modelValue.title" class="input-group-append">
          <button class="input-group-text font-weight-bold text-primary">{{btnText}}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
    },
    id: {
      type: Number,
      required: false,
    },
  },
  methods: {
    update(key, value) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [key]: value,
      });
    },
  },
  watch: {
    modelValue(newVal, oldVal) {
      if (newVal.id && oldVal.id !== newVal.id) {
        this.$refs.taskRef.focus();
      }
    },
  },
  computed: {
    btnText() {
      return this.modelValue.id ? "UPDATE" : "ADD";
    },
  },
};
</script>

<style scoped>
.task-input .input-group .input-group-text {
  background-color: transparent;
  border: 0;
}
.task-input .input-group-append > button.input-group-text {
  font-size: 14px;
}
</style>
import { createStore } from 'vuex'
import { Storage } from '../services/Storage'
export default createStore({
  state() {
    return {
      tasks: Storage.getJSON('tasks', [])
    }
  },
  mutations: {
    UPDATE(state, tasks) {
      Storage.setJSON('tasks', tasks)
      state.tasks = tasks
    },
  },
  actions: {
    add({ commit, state }, title) {
      const tasks = [...state.tasks]
      tasks.unshift({
        id: Date.now(),
        title,
        status: false
      })
      commit('UPDATE', tasks)
    },

    remove({ commit, state }, ids) {
      const tasks = state.tasks.filter(task => !ids.includes(task.id))      // const taskIndex = tasks.findIndex(task => task.id === id)
      commit('UPDATE', tasks)
    },

    update({ commit, state }, { id, title }) {
      const tasks = [...state.tasks]
      const taskIndex = tasks.findIndex(task => task.id === id)
      if (taskIndex !== -1) {
        tasks[taskIndex].title = title
        commit('UPDATE', tasks)
      }
    },

    toggle({ commit, state }, id) {
      const tasks = [...state.tasks]
      const taskIndex = tasks.findIndex(task => task.id === id)
      if (taskIndex !== -1) {
        tasks[taskIndex].status = !tasks[taskIndex].status
        commit('UPDATE', tasks)
      }
    }

  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    pendingTasks(state) {
      return state.tasks.filter(task => !task.status)
    },
    finishedTasks(state) {
      return state.tasks.filter(task => task.status)
    }
  }
})
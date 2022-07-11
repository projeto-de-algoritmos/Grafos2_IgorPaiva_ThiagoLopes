import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
// import app from './app';

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const Store = createStore({
    state: {
      isBfs: false,
      fastTravel: false,
      showAllEdges: false,
      sleepTime: 50,
    },
    getters: {
      isBfs(state) {
        return state.isBfs;
      },
      fastTravel(state) {
        return state.fastTravel;
      },
      showAllEdges(state) {
        return state.showAllEdges;
      },
      sleepTime(state) {
        return state.sleepTime;
      },
    },
    mutations: {
      setIsBfs(state, value) {
        state.isBfs = value;
      },
      setFastTravel(state, value) {
        state.fastTravel = value;
      },
      setShowAllEdges(state, value) {
        state.showAllEdges = value;
      },
      setSleepTime(state, value) {
        state.sleepTime = value;
      },
    },
    actions: {
      setIsBfs({ commit }, value) {
        commit('setIsBfs', value);
      },
      setFastTravel({ commit }, value) {
        commit('setFastTravel', value);
      },
      setShowAllEdges({ commit }, value) {
        commit('setShowAllEdges', value);
      },
      setSleepTime({ commit }, value) {
        commit('setSleepTime', value);
      },
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING,
  });

  return Store;
});

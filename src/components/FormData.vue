<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-checkbox v-model="fastTravel" label="Fast Travel" :disable="disableFields">
        <q-tooltip style="font-size: 12px">
          Cria arestas entre todos os signposts
        </q-tooltip>
      </q-checkbox>

      <q-checkbox v-model="showAllEdges" label="Mostrar Arestas" :disable="disableFields">
        <q-tooltip style="font-size: 12px">
          Desenha todas as arestas disponíveis
        </q-tooltip>
      </q-checkbox>

      <q-btn-toggle
        v-model="isBfs"
        class="my-custom-toggle"
        no-caps
        rounded
        unelevated
        color="white"
        toggle-color="primary"
        text-color="primary"
        spread
        :disable="disableFields"
        :options="[
          {label: 'BFS', value: true},
          {label: 'Dijkstra', value: false},
        ]"
      />

      <div class="row">
        <q-input
          v-model="sleepTime"
          class="col-6"
          label="Delay (ms)"
          :disable="disableFields"
        >
          <q-tooltip style="font-size: 12px">
            Intervalo entre o desenho de cada aresta
          </q-tooltip>
        </q-input>
      </div>
    </div>
  </div>
</template>

<style>
.my-custom-toggle {
  border: 1px solid #027be3
}
</style>

<script>
/* eslint-disable no-unused-vars */
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default defineComponent({
  name: 'FormData',
  data() {
    return {
      isBfs: false,
      fastTravel: false,
      showAllEdges: false,
      sleepTime: 50,
    };
  },
  watch: {
    isBfs(newValue, _) {
      this.setIsBfs(newValue);
    },
    fastTravel(newValue, _) {
      this.setFastTravel(newValue);
    },
    showAllEdges(newValue, _) {
      this.setShowAllEdges(newValue);
    },
    sleepTime(newValue, _) {
      this.setSleepTime(newValue);
    },
  },
  computed: mapGetters({
    disableFields: 'disableFields',
  }),
  methods: {
    ...mapActions({
      setIsBfs: 'setIsBfs',
      setFastTravel: 'setFastTravel',
      setShowAllEdges: 'setShowAllEdges',
      setSleepTime: 'setSleepTime',
    }),
  },
});
</script>

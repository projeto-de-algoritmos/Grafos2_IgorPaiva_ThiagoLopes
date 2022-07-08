<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-checkbox v-model="fastTravel" label="Fast Travel">
        <q-tooltip style="font-size: 12px">
          Cria arestas entre todos os signposts
        </q-tooltip>
      </q-checkbox>

      <q-checkbox v-model="showAllEdges" label="Mostrar Arestas">
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
        :options="[
          {label: 'BFS', value: true},
          {label: 'Dijkstra', value: false},
        ]"
      />
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
import { mapActions } from 'vuex';

export default defineComponent({
  name: 'FormData',
  data() {
    return {
      isBfs: false,
      fastTravel: false,
      showAllEdges: false,
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
  },
  methods: {
    ...mapActions({
      setIsBfs: 'setIsBfs',
      setFastTravel: 'setFastTravel',
      setShowAllEdges: 'setShowAllEdges',
    }),
  },
});
</script>

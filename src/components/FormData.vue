<template>
  <div class="q-pa-md">
    <div class="q-gutter-sm">
      <q-checkbox v-model="fastTravel" label="Fast Travel"/>
      <q-checkbox v-model="showAllEdges" label="Mostrar Arestas"/>

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
          {label: 'DFS', value: false}
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
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'FormData',
  props: {
  },
  created() {
    const $q = useQuasar();

    const formData = $q.sessionStorage.getItem('formData');

    if (!formData) {
      const { isBfs, fastTravel, showAllEdges } = this;

      $q.sessionStorage.set('formData', { isBfs, fastTravel, showAllEdges });
    } else {
      const { isBfs, fastTravel, showAllEdges } = formData;

      this.isBfs = isBfs;
      this.fastTravel = fastTravel;
      this.showAllEdges = showAllEdges;
    }
  },
  data() {
    return {
      isBfs: true,
      fastTravel: false,
      showAllEdges: false,
    };
  },
});
</script>

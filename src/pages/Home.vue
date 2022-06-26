<template>
  <q-page class="flex flex-center">
    <div style="position: relative">
      <canvas id="canvas"></canvas>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import canvasBackground from '../assets/images/white_orchard_clean_map.png';

export default defineComponent({
  name: 'HomePage',
  mounted() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 1280;
    canvas.height = 1024;

    const background = new Image();
    background.src = canvasBackground;

    background.onload = () => {
      ctx.drawImage(background, 0, 0);
    };
  },
  data() {
    return {
      canvasWidth: 1280,
      canvasHeight: 1024,
    };
  },
});
</script>

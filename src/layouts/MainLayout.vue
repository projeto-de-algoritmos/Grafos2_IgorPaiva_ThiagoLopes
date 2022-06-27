<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-toolbar style="color: #ffffff; background-color: #027be3;">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
          The Witcher 3 - Map
        </q-toolbar-title>
      </q-toolbar>

      <q-list>
        <q-item-label
          header
        >
          Pages
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          target="_self"
        />
      </q-list>

      <hr class="q-mt-lg">

      <FormData />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import FormData from 'components/FormData.vue';

const linksList = [
  {
    title: 'Home',
    caption: 'Homepage',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Map',
    caption: 'Map with all edges',
    icon: 'map',
    link: '/map',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    FormData,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>

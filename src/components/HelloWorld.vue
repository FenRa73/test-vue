<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="auto">
        <v-btn rounded='lg' density="default" @click="firstButtonClick">Первая кнопка</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn rounded='lg' density="default" @click="addRow">Вторая кнопка</v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn rounded='lg' density="default" @click="changeEL">Футбол</v-btn>
      </v-col>
    </v-row>
    <v-row>
      {{ el }}
    </v-row>
    <v-row>
      <v-text-field v-model="el"></v-text-field>
    </v-row>
  </v-container>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Calories
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.calories }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      el: 'Hello',
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    }
  },
  mounted() {
    console.log('mounted')
  },
  methods: {
    firstButtonClick() {
      axios.get
    },
    addRow() {
      this.desserts.push({ name: 'New elem', calories: 580 })
    },
    changeEL() {
      this.el = 'Bye-Bye'
    }
  },
}
</script>

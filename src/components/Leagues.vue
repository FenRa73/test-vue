<template>
  <div class="mt-2">
    <!-- Строка поиска с debounce -->
    <v-text-field v-model="searchQuery" class="mb-4" max-width="50%" label="Поиск по названию лиги" outlined
      prepend-inner-icon="mdi-magnify" @input="onSearchInput" />

    <!-- Лоадер при загрузке -->
    <v-progress-circular v-if="isLoading" class="d-block mx-auto my-8" color="primary" indeterminate />

    <!-- Сообщение, если лиг нет -->
    <v-alert v-else-if="filteredLeagues.length === 0" class="ma-4" type="info">
      {{ searchQuery ? 'Ничего не найдено' : 'Нет доступных лиг' }}
    </v-alert>

    <!-- Карточки лиг + пагинация -->
    <template v-else>
      <v-row>
        <v-col v-for="league in paginatedLeagues" :key="league.id" cols="12" lg="3" md="4" sm="6">
          <card :id="league.id" :emblem="league.emblem" :league="league.area.name" :name="league.name"
            @handle-card-click="goToLeague" />
        </v-col>
      </v-row>

      <!-- Пагинация -->
      <v-pagination v-model="page" class="mt-4" :length="totalPages" :total-visible="7" />
    </template>
  </div>
</template>


<script>
import api from '@/api'
import Card from '@/components/Card.vue'
export default {
  components: { Card },
  data() {
    return {
      page: 1,
      itemsPerPage: 12,
      leagues: [],
      searchQuery: '',
      isLoading: false,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredLeagues.length / this.itemsPerPage)
    },
    paginatedLeagues() {
      const start = (this.page - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredLeagues.slice(start, end)
    },
    filteredLeagues() {
      if (!this.searchQuery) return this.leagues;
      const query = this.searchQuery.toLowerCase();
      return this.leagues.filter(league => league.name.toLowerCase().includes(query))
    },
  },
  mounted() {
    this.loadLeagues();
  },
  methods: {
    onSearchInput() {
      this.page = 1;
    },
    loadLeagues() {
      this.isLoading = true;
      api.get('api/v4/competitions')
        .then(response => this.leagues = response.data.competitions)
        .catch(error => console.error(error))
        .finally(() => this.isLoading = false);
    },
    goToLeague(payload) {
      this.$router.push(`/league/?id=${payload.id}`);
    },
  },
}
</script>
<style scoped>
.v-pagination {
  justify-content: center;
}
</style>
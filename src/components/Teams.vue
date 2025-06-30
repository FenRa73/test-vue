<template>
    <div class="mt-2">
        <!-- Строка поиска с debounce -->
        <v-text-field v-model="searchQuery" class="mb-4" max-width="50%" label="Поиск по названию команды" outlined
            prepend-inner-icon="mdi-magnify" @input="onSearchInput" />

        <!-- Лоадер при загрузке -->
        <v-progress-circular v-if="isLoading" class="d-block mx-auto my-8" color="primary" indeterminate />

        <!-- Сообщение, если команд нет -->
        <v-alert v-else-if="filteredTeams.length === 0" class="ma-4" type="info">
            {{ searchQuery ? 'Ничего не найдено' : 'Нет доступных команд' }}
        </v-alert>

        <!-- Карточки команд + пагинация -->
        <template v-else>
            <v-row>
                <v-col v-for="team in paginatedTeams" :key="team.id" cols="12" lg="3" md="4" sm="6">
                    <card :id="team.id" :emblem="team.crest" :name="team.name" :league="team.website"
                        @handle-card-click="goToTeam" />
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
            teams: [],
            searchQuery: '',
            isLoading: false,
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredTeams.length / this.itemsPerPage)
        },
        paginatedTeams() {
            const start = (this.page - 1) * this.itemsPerPage
            const end = start + this.itemsPerPage
            return this.filteredTeams.slice(start, end)
        },
        filteredTeams() {
            if (!this.searchQuery) return this.teams;
            const query = this.searchQuery.toLowerCase();
            return this.teams.filter(team => team.name.toLowerCase().includes(query))
        },
    },
    mounted() {
        this.loadTeams();
    },
    methods: {
        onSearchInput() {
            this.page = 1;
        },
        loadTeams() {
            this.isLoading = true;
            api.get('api/v4/teams')
                .then(response => this.teams = response.data.teams)
                .catch(error => console.error(error))
                .finally(() => this.isLoading = false);
        },
        goToTeam(payload) {
            this.$router.push(`/team/?id=${payload.id}`);
        },
    },
}
</script>
<style scoped>
.v-pagination {
    justify-content: center;
}
</style>
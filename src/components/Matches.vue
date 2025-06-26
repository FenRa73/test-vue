<template>
    <div>
        <v-col>
            Лиги > {{ leagueName }}
        </v-col>
        <v-col class="pt-0">
            <h1>Матчи</h1>
        </v-col>
        <v-progress-circular v-if="isLoading" class="d-block mx-auto my-8" color="primary" indeterminate />
        <v-expansion-panels>
            <v-expansion-panel class="ma-2">
                <v-expansion-panel-title v-slot="{ expanded }">
                    <v-row no-gutters>
                        <v-col class="d-flex justify-start" cols="4">
                            Фильтрация по дате
                        </v-col>
                        <v-col class="text--secondary" cols="8">
                            <v-fade-transition leave-absolute>
                                <span v-if="expanded"></span>
                                <v-row v-else style="width: 100%" no-gutters>
                                    <v-col class="d-flex justify-start" cols="6">
                                        Начальная дата: {{ formattedDateFrom || 'Не выбрана' }}
                                    </v-col>
                                    <v-col class="d-flex justify-start" cols="6">
                                        Конечная дата: {{ formattedDateTo || 'Не выбрана' }}
                                    </v-col>
                                </v-row>
                            </v-fade-transition>
                        </v-col>
                    </v-row>

                </v-expansion-panel-title>
                <v-col class="d-flex justify-center">
                    <v-btn @click="clearFilter">Очистить фильтр</v-btn>
                </v-col>
                <v-expansion-panel-text>
                    <v-row justify="space-around" no-gutters>
                        <v-col cols="3">
                            <v-date-picker v-model="dateFrom" title="Начальная дата" header="Укажите дату" />
                        </v-col>

                        <v-col cols="3">
                            <v-date-picker v-model="dateTo" title="Конечная дата" header="Укажите дату" />
                        </v-col>
                    </v-row>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>

        <v-data-table :headers="headers" :items="filteredMatches">
            <template #item.utcDate="{ item }">
                {{ new Date(item.utcDate).toLocaleString() }}
            </template>

            <template #item.status="{ item }">
                <v-chip :color="getStatusColor(item.status)" small>
                    {{ getStatusText(item.status) }}
                </v-chip>
            </template>

            <template #item.teams="{ item }">
                <b>{{ item.homeTeam?.name }} (H) </b> - {{ item.awayTeam?.name }}
            </template>

            <template #item.score="{ item }">
                {{ item.score?.fullTime.home }} - {{ item.score?.fullTime.away }} ( {{ item.score?.halfTime.home }} -
                {{
                    item.score?.halfTime.away }} )
            </template>
        </v-data-table>

    </div>
</template>


<script>
import api from '@/api'
export default {
    data() {
        return {
            dateFrom: null,
            dateTo: null,
            leagueName: null,
            page: 1,
            itemsPerPage: 12,
            matches: [],
            isLoading: false,
            headers: [
                { key: 'utcDate', title: 'Дата' },
                { key: 'status', title: 'Статус' },
                { key: 'teams', title: 'Команды' },
                { key: 'score', title: 'Счет' },
            ],
        }
    },
    computed: {
        filteredMatches() {
            if (!this.dateFrom || !this.dateTo) return this.matches;
            return this.matches.filter(match => {
                const matchDate = new Date(match.utcDate);
                if (matchDate >= this.dateFrom && matchDate <= this.dateTo) return true
                return false
            }
            )
        },

        formattedDateTo() {
            if (!this.dateTo) return
            return new Date(this.dateTo).toLocaleString()
        },
        formattedDateFrom() {
            if (!this.dateFrom) return
            return new Date(this.dateFrom).toLocaleString()
        },
        // totalPages() {
        //     return Math.ceil(this.matches.length / this.itemsPerPage)
        // },
        // paginatedLeagues() {
        //     const start = (this.page - 1) * this.itemsPerPage
        //     const end = start + this.itemsPerPage
        //     return this.matches.slice(start, end)
        // },
    },
    mounted() {
        this.loadMatches();
        this.loadLeagueName();
    },
    methods: {
        clearFilter() {
            this.dateFrom = null
            this.dateTo = null
        },

        getStatusText(status) {
            const statusMap = {
                FINISHED: 'Матч завершен',
                SCHEDULED: 'Запланирован',
                LIVE: 'В прямом эфире',
                IN_PLAY: 'В игре',
                PAUSED: 'Пауза',
                POSTPONED: 'Отложен',
                SUSPENDED: 'Приостановлен',
                CANCELED: 'Отменен',
                TIMED: 'Рассчитан'
            }
            return statusMap[status] || status
        },
        getStatusColor(status) {
            const statusMap = {
                FINISHED: 'green',
                SCHEDULED: 'blue',
                LIVE: 'red',
                IN_PLAY: 'yellow',
                PAUSED: 'purple',
                POSTPONED: 'gray',
                SUSPENDED: 'orange',
                CANCELED: 'brown',
                TIMED: 'pink'
            }
            return statusMap[status] || status
        },
        loadMatches() {
            this.isLoading = true;
            const leagueId = this.$route.query.id;
            api.get(`api/v4/competitions/${leagueId}/matches`)
                .then(response => this.matches = response.data.matches)
                .catch(error => console.error(error))
                .finally(() => this.isLoading = false);
        },

        loadLeagueName() {
            this.isLoading = true;
            const leagueId = this.$route.query.id;
            api.get(`api/v4/competitions/${leagueId}`)
                .then(response => this.leagueName = response.data.name)
                .catch(error => console.error(error))
                .finally(() => this.isLoading = false);
        },


        onSearchInput() {
            this.page = 1;
        },
    },
}
</script>
<style scoped>
.v-pagination {
    justify-content: center;
}
</style>
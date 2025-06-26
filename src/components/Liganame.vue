<template>
    {{ leagueName }}
</template>

<script>
import api from '@/api'
export default {
    data() {
        return {
            leagueName: [],
        }
    },
    mounted() {
        this.loadLeagueName();
    },
    methods: {
        loadLeagueName() {
            // this.isLoading = true;
            // const leagueId = this.$route.query.id;
            api.get(`api/v4/competitions/2016`)
                .then(response => this.leagueName = response.data.name)
                .catch(error => console.error(error))
                .finally(() => this.isLoading = false);
        },
    }
}
</script>
<template>
    <v-app-bar app class="mt-0 mb-0 mr-2 ml-2" dense height="190" justify="start">
        <v-row justify="start" align="center">
            <v-img :src="logoSrc" max-height="100" max-width="150" contain class="mr-2"
                @click="this.$router.push(`/`)"></v-img>
            <v-btn class="bg-blue ma-2" min-width="12%" height="100" variant="tonal"
                @click="this.$router.push(`/leaguelist`)">
                Лиги
            </v-btn>
            <v-btn class="bg-blue ma-2" min-width="12%" height="100" variant="tonal"
                @click="this.$router.push(`/teamlist`)">
                Команды
            </v-btn>
            <v-row justify="end">
                <v-col cols="12" sm="8" md="5">
                    <v-card>
                        <v-card-title class="headline">Текущее время:</v-card-title>
                        <v-card-text>
                            <div class="text-h4">{{ currentTime }}</div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-row>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            logoSrc: '../src/assets/soccer_ball.jpg',
            currentTime: ''
        }
    },
    mounted() {
        this.updateTime();
        this.timer = setInterval(this.updateTime, 1000);
    },
    beforeDestroy() {
        clearInterval(this.timer);
    },
    methods: {
        updateTime() {
            const now = new Date();
            this.currentTime = now.toLocaleTimeString();
        },
    },
}
</script>
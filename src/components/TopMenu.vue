<template>
    <v-app-bar app class="mt-0 mb-0 mr-2 ml-2" height="100" justify="start">
        <v-row justify="start" align="center">
            <v-img :src="logoSrc" max-height="100" max-width="150" contain class="mr-2"></v-img>
            <v-btn class="bg-blue ma-2" min-width="12%" height="100" variant="tonal" @click="this.$router.push(`/`)">
                Лиги
            </v-btn>
            <v-btn class="bg-blue ma-2" min-width="12%" height="100" variant="tonal"
                @click="this.$router.push(`/teamlist`)">
                Команды
            </v-btn>
        </v-row>
    </v-app-bar>
</template>

<script>
export default {
    data() {
        return {
            logoSrc: '../src/assets/soccer_ball.jpg',
        }
    },
}
</script>
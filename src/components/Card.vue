<template>
    <v-card class="ma-2" @click="$emit('handle-card-click', { id })">
        <v-img class="grey lighten-2 " contain height="100" :src="emblem" />
        <v-card-title>{{ name }}</v-card-title>
        <v-card-subtitle>{{ league }}</v-card-subtitle>
    </v-card>
</template>

<script>
export default {
    props: {
        id: {
            type: Number,
            required: true,
        },

        emblem: {
            type: String,
            default: () => '/src/assets/placeholder.svg',
        },

        name: {
            type: String,
            required: true,
        },

        // Кастомная валидация
        league: {
            type: String,
            default: () => 'Не указано',
        },
    },
    emits: ['handle-card-click'],
}
</script>

<style scoped>
.league-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: transform 0.3s;
    margin-bottom: 16px;
}

.league-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.v-card-title {
    font-size: 1.2rem;
    font-weight: bold;
    padding-bottom: 0;
}

.v-card-subtitle {
    padding-top: 0;
    font-size: 1rem;
}
</style>
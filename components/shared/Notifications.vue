<template lang="pug">
    .container
        .columns
            .column.is-4.is-offset-4
                .notification(:class="type_message")
                    slot(name="body") Algo anduvo mal


</template>
<script>
    export default {
        props:{
            type_message: {
                type: String,
                require: false,
            }
        }
    }
</script>
<style  lang="scss" scoped>
    .notification {
        margin: 10px;
    }
</style>

<template lang="pug">
    .content(v-if="track && track.id")
        p.is-128x128
            img(:src="track.album.images[0].url")
        p
            strong {{track.name}}
            small {{track.duration_ms | ms-to-mm}}
        p
            audio(controls, :src="track.preview_url")

</template>

<script>
    /* eslint-disable no-console */

    import { mapState } from 'vuex'
    export default {

        computed: {
            ... mapState(['track']),
        }
        // created(){
        //     this.$bus.$on('set-track',(track)=>{
        //         console.log('set-track');
        //         this.track = track;
        //     })
        // }
    }
</script>

<style scoped>
    img {
        width: 124px;
        border-radius: 50%;
    }
</style>

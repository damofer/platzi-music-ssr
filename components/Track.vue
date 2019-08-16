<template lang="pug">
    .card(v-if="track && track.album")
        .card-image
            .figure.image.is-1by1
                img(:src="track.album.images[0].url")

        .card-content
            .media
                .media-left
                    .figure.image.is-48x48
                         img(:src="track.album.images[0].url")
                .media-content
                    p.title.is-6
                        strong {{track.name}}
                    p.subtitle.is-6 {{track.artists[0].name}}

            .content
                small {{track.duration_ms | ms-to-mm}}
                nav.level
                    .level-left
                        button.button.is-primary.level-item
                            span(@click="selectTrack").icon.is-small ▶
                        button.button.is-warning.level-item
                            span(@click="goToTrack(track.id)").icon.is-small 🌎

</template>

<script>
    import trackMixin from '~/plugins/mixins/track';
    import {mapMutations } from 'vuex'
    export default {
        name: "Track",
        mixins: [trackMixin],

        props:{
            track: {
                type:Object,
                required: true
            }
        },
        methods:{
            ... mapMutations(['setTrack']),
            selectTrack(){
              if(!this.track.preview_url) {return}
              this.setTrack(this.track)

            },
            goToTrack(id){
                if(!this.track.preview_url) {return}
                this.$router.push({
                  path:`/track/${id}`
                });

            }
        },
        filters:{
            toSecs(data){
                return (data / 1000)
            }
        }

    }
</script>

<style scoped>

</style>

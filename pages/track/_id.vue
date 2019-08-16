<template lang="pug">
  .container(v-if="track && track.id")
    .columns
      .column.is-3.has-text-centered
        figure.media-left
          p.image
            img(:src="track.album.images[0].url")
          <!--p-->
          <!--a.button.is-primary.is-large-->
          <!--span.icon(@click="selectTrack")-->
      .column.is-8
        .panel-heading
          h1.title {{track.name}}
        .panel-block
          article.media
            .media-content
              .content
                ul(v-for="(v,k) in track")
                  li
                    strong {{k}} :&nbsp;
                    span {{v}}
            //nav.level
            //  .level-left
            //    a.level-item

</template>

<script>
  /* eslint-disable no-console */
  import {mapState , mapActions, mapGetters } from 'vuex'
  import trackMixin from '~/plugins/mixins/track';
  import trackService from '~/plugins/platzi-music-service/track'
  export default {
    mixins: [trackMixin],
    computed: {
      ... mapState(['track']),
      ... mapGetters(['trackTitle'])
    },
    methods : {
      ... mapActions(['getTrackById']),
    },
    data() {
      return {
        track : {}
      }
    },
    head () {
      return {
        title: this.track.name
      }
    },
    asyncData({ params }) {
      const id = params.id;
      // if(!this.track || !this.track.id || this.track.id !== id)
      // this.getTrackById({id})
      return trackService.getById(id)
        .then((res)=>{
          return {
            track : res
          }
        });

    }
  }
</script>

<style lang="scss" scoped>
  .columns{
    margin: 20px;
  }


  .button-bar {
    margin-top: 20px;
  }

</style>

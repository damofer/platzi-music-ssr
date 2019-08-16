<template lang="pug">
    main
        transition(name="move")
            pm-notifications(v-show='showNotification' :type_message='notificationType')
                p(slot='body') {{notificationMessage}}
        transition(name="move")
            pm-loader(v-show="isLoading")
        section(v-show="!isLoading").section
            nav.nav
                .container
                    input.input.is-large(
                    v-model='searchQuery',
                    type="text",
                    placeholder="Buscar cancion",
                    @keyup.enter="search"

                    )
                    a(@click="search").button.is-info.is-large Buscar
                    a.button.is-danger.is-large &times;
            .container.results
                p
                    small {{searchMessage}}
                .columns.is-multiline
                    .column.is-one-quarter(v-for ="t in tracks")
                        pm-track(
                        :class="{'is-active' : t.id === selectedTrack }",
                        :track="t",
                        @select="setSelectedTrack",
                        v-blur ="t.preview_url"

                        )




</template>

<script>
    /* eslint-disable no-console */
    import PmLoader from '~/components/shared/Loader.vue'
    import trackService from '~/plugins/platzi-music-service/track'

    import PmTrack from '~/components/Track.vue'
    import PmNotifications from '~/components/shared/Notifications.vue'
    export default {
        name: 'platzi-music',
        data(){
            return {
                searchQuery : '',
                tracks: [],
                isLoading: false,

                selectedTrack: '',
                showNotification: false,
                notificationMessage: '',
                notificationType:'',


            }
        },

        components:{
            PmTrack,
            PmLoader,
            PmNotifications
        },
        computed: {
            searchMessage(){
                return 'Encontrados: '+ this.tracks.length;
            }
        },
        methods:{
            search (){
                if(!this.searchQuery ) {return}
                this.isLoading = true;
                trackService.search(this.searchQuery)
                    .then(res => {
                        console.log(res);
                        this.showNotification = true;
                        if(res.tracks.total === 0){
                            this.notificationType = 'is-danger';
                            this.notificationMessage = 'No se han encontrado resultados';
                        }else {
                            this.notificationType = 'is-success';
                            this.notificationMessage = 'Sea han encontrado ' + res.tracks.total + ' Resultados' ;
                        }
                        this.tracks = res.tracks.items;
                        this.isLoading = false;
                    })
            },
            setSelectedTrack(id){
                this.selectedTrack = id ;
            }

        },
        watch:{
            showNotification () {
                if(this.showNotification) {
                    setTimeout(() => {
                        this.showNotification = false
                    },3000)
                }
            }
        },
        mounted(){

        }
    }
</script >

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .results {
        margin-top: 50px;
        columns{
            flex-wrap: wrap;
        }

        .column{
            min-width: 150px;
        }
    }
    .is-active{
        border: 3px #23d160 solid;
    }
</style>

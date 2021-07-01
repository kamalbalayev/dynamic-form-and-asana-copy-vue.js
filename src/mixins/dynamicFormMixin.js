const asanaMixin = {

    computed: {
        sections: {
            get() {
                return this.$store.state.asana.sections
            },
            set(value) {
                this.$store.commit("UPDATE_SECTIONS", value);
            }
        },
        users() {
            return this.$store.state.asana.users
        },
        priority() {
            return this.$store.state.asana.priority
        },
        months (){
            return this.$store.state.asana.months
        }
    },
    methods:{

        completeTask(tId, sId, sbtId) {
            this.$store.commit('COMPLETE_TASK', {tId, sId, sbtId})
        },

        deleteTask(tId, sId, sbtId) {
            this.$store.commit('DELETE_TASK', {tId, sId, sbtId})
        },

        setActive(id, target) {
            this.$store.commit('SET_ACTIVE', {id, target})
        },

        getActive(target) {
            return this.$store.state.asana[target]
        },

        getById(id, target) {
            return this[target].find(item => item.id === id)
        },

        formatDate(date, hasTime){
            const month = new Date(date).getMonth();
            const day = new Date(date).getDate();
            const time = new Date(date).getTime();

            if(date){
                return `${day} ${this.months[month]}${hasTime ? ', ' + time : ''}`
            }
        },

        focusInput(target){
            this.$el.querySelector(target).focus()
        }
    }
}

export default asanaMixin
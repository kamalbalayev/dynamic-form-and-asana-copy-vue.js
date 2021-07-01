import Vue from 'vue'
import Vuex from 'vuex'

import asana from './asana'
import dynamicForm from './dynamicForm'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        asana,
        dynamicForm,
    }
})

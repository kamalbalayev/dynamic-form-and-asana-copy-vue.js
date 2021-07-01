const asana = {
    state: {

        activeSection: null,
        activeTask: null,
        taskDetail: false,

        sections: [
            {
                id: 1,
                name: 'Section 1',
                tasks: []
            },
            {
                id: 2,
                name: 'Section 2',
                tasks: []
            },
        ],

        users: [
            {
                id: 1,
                name: 'Kamal Balayev',
                email: 'kamal.balaev@gmail.com',
                image: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460'
            },
            {
                id: 2,
                name: 'Diğer kullanıcı',
                email: 'other.user@gmail.com',
                image: 'https://avatars0.githubusercontent.com/u/9064065?v=4&s=460'
            },
        ],

        priority: [
            {
                id: 1,
                name: 'Hight',
                color: 'bg-danger'
            },
            {
                id: 2,
                name: 'Medium',
                color: 'bg-warning text-dark'
            },
            {
                id: 3,
                name: 'Low',
                color: 'bg-info'
            },
        ],

        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    },
    mutations: {

        ADD_SECTION(state){

            const section = {
                id: Date.now(),
                name: '',
                tasks: []
            }

            state.sections.push(section)

            this.commit('SET_ACTIVE', {id: section.id, target: 'activeSection'})
        },

        UPDATE_SECTIONS(state, sections){
            state.sections = sections
        },

        ADD_TASK(state, payload){

            const task = {
                id: Date.now(),
                parent_id: payload.tId || null,
                section_id: payload.sId,
                name: '',
                description: '',
                due_date: null,
                assignee: null,
                project: null,
                priority: null,
                completed: false,
                created_at: new Date().toLocaleString(),
                sub_tasks: []
            }

            if(payload.tId){
                const parentTask = state.sections[payload.si].tasks.find(task => task.id === payload.tId)
                parentTask.sub_tasks.push(task)
            }else{
                state.sections[payload.si].tasks.push(task)
                this.commit('SET_ACTIVE', {id: task.id, target: 'activeTask'})
            }
        },

        COMPLETE_TASK(state, payload){
            const section = state.sections.find(section => section.id === payload.sId)
            const task = section.tasks.find(task => task.id === payload.tId)

            if(payload.sbtId){
                const subTask = task.sub_tasks.find(subTask => subTask.id === payload.sbtId)
                subTask.completed = !subTask.completed
            }else{
                task.completed = !task.completed
            }
        },

        DELETE_TASK(state, payload){
            const section = state.sections.find(section => section.id === payload.sId)
            const task = section.tasks.find(task => task.id === payload.tId)

            if(payload.sbtId){
                const subTask = task.sub_tasks.find(subTask => subTask.id === payload.sbtId)
                const subTaskIndex = task.sub_tasks.indexOf(subTask)
                task.sub_tasks.splice(subTaskIndex, 1)
            }else{
                const taskIndex = section.tasks.indexOf(task)
                section.tasks.splice(taskIndex, 1)
            }
        },

        SET_ACTIVE(state, payload){
            state[payload.target] = payload.id
        }
    },
    actions: {},
}

export default asana

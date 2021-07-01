<template>
    <div class="container-fluid h-100 bg-light">
        <div class="sections-wrap d-flex h-100 mw-100 overflow-auto p-4">

            <draggable v-model="sections" :group="{ name: 'task-section'}" class="d-flex h-100">
                <div class="section d-flex flex-column rounded p-2 me-2 h-100" v-for="(section, s) in sections">

                    <div class="header d-flex justify-content-between align-items-center">
                        <div class="title w-100 me-2">

                            <h2 v-text="section.name"
                                class="h6 mb-0 p-2"
                                @click="editSection(section.id, true)"
                                v-if="getActive('activeSection') !== section.id || !editTitle"/>

                            <input v-model="section.name"
                                   type="text" class="form-control border-0 px-2 shadow"
                                   :id="`section-title-input-${section.id}`"
                                   @blur="editSection(section.id, false, section)"
                                   @keypress.enter="editSection(section.id, false, section)"
                                   v-if="getActive('activeSection') === section.id && editTitle">

                        </div>

                        <button type="button" class="btn btn-light btn-sm me-1" @click="addTask(s, section.id)">
                            <i class="bi bi-plus-lg" aria-hidden="true"/>
                        </button>

                        <button type="button" class="btn btn-light btn-sm" v-if="s > 0" @click="deleteSection(s)">
                            <i class="bi bi-trash" aria-hidden="true"/>
                        </button>

                    </div>

                    <draggable v-model="section.tasks" :group="{ name: 'tasks'}" @change="moveTask($event, section.id)" style="min-height: 500px">
                        <task-item v-for="(task, t) in section.tasks" :key="`task-${t}`"
                                   :task="task" @open-task="openTask($event.tId, $event.sId)"/>
                    </draggable>

                </div>
            </draggable>

            <div class="section d-flex flex-column rounded p-2 me-2 h-100">
                <div class="header d-flex justify-content-between align-items-center">
                    <button type="button" class="btn btn-light btn-sm me-1" @click="addSection()">
                        <i class="bi bi-plus-lg me-2" aria-hidden="true"/>
                        Add section
                    </button>
                </div>
            </div>

        </div>

        <task-detail @add-sub-task="addTask($event.si, $event.sId, $event.tId)"/>

    </div>
</template>

<script>
import draggable from 'vuedraggable'
import asanaMixin from "@/mixins/asanaMixin";

export default {
    name: "Wrap",

    mixins:[asanaMixin],

    components:{
        draggable,
        TaskDetail: ()=> import('./TaskDetail'),
        TaskItem: ()=> import('./TaskItem'),
    },

    data(){
        return{
            editTitle: false
        }
    },

    methods: {

        addSection() {
            this.$store.commit('ADD_SECTION')
            this.editTitle = true;

            const sId = this.getActive('activeSection')

            setTimeout(()=>{
                this.focusInput(`#section-title-input-${sId}`)
            }, 50)
        },

        editSection(id, status, section) {

            if(status){
                this.editTitle = true;
                this.setActive(id, 'activeSection')

                setTimeout(()=>{
                    this.focusInput(`#section-title-input-${id}`)
                }, 50)

            }else{
                this.editTitle = false;
                this.setActive(null, 'activeSection')
                const si = this.sections.indexOf(section)

                if(section.name === ''){
                    if(this.sections.length === 1 || section.tasks.length > 0){
                        section.name = 'Untitled Section'
                    }else{
                        this.deleteSection(si)
                    }
                }
            }


        },

        deleteSection(i) {
            this.$delete(this.sections, i)
        },

        addTask(si, sId, tId) {
            this.$store.commit('ADD_TASK', {si, sId, tId})

            if(!tId){
                const atId = this.getActive('activeTask')
                this.openTask(atId, sId)
            }
        },

        openTask(tId, sId){
            this.setActive(sId, 'activeSection')
            this.setActive(tId, 'activeTask')
            this.setActive(true, 'taskDetail')

            const taskDetail = document.getElementById('taskDetail')
            const taskDetailCanvas = new bootstrap.Offcanvas(taskDetail)
            taskDetailCanvas.toggle()
        },

        moveTask(event, sId){
            if(event.added){
                const task = event.added.element
                task.section_id = sId
            }
        }
    }
}
</script>

<style lang="scss">
.sections-wrap {
    .section {
        max-width: 300px;
        min-width: 300px;
        border: 1px solid transparent;

        &:hover{
            border-color: #ddd;
        }
    }
}

.blue-light {
    background-color: rgba(0, 155, 255, 0.1);
}

.transparent{
    background: transparent !important;
}
</style>
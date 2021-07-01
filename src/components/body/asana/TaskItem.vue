<template>
    <div class="task-item card rounded border shadow mt-2"
         :class="{'blue-light': getActive('activeTask') === task.id && getActive('taskDetail') === true}">

        <div class="card-body relative">

            <button type="button" class="delete btn btn-light btn-sm position-absolute" @click="deleteTask(task.id, task.section_id)">
                <i class="bi bi-trash" aria-hidden="true"/>
            </button>

            <h5 class="card-title h6 d-flex mb-3">
                <i class="bi" :class="`bi-check-circle${task.completed ? '-fill text-success' : ''}`"
                   aria-hidden="true" @click="completeTask(task.id, task.section_id)"/>

                <span v-text="task.name" class="text-break ps-2 flex-grow-1"
                      @click="openTask(task.id, task.section_id)"/>

            </h5>

            <div class="tags d-flex"
                 v-if="getById(task.priority, 'priority')"
                 @click="openTask(task.id, task.section_id)">

                <i class="bi bi-tags-fill text-secondary" aria-hidden="true"/>

                <div class="w-100 ps-2">
                    <span v-text="getById(task.priority, 'priority').name"
                          class="badge rounded-pill me-1"
                          :class="getById(task.priority, 'priority').color"/>

                </div>
            </div>

            <div class="d-flex align-items-center justify-content-between mt-3"
                 @click="openTask(task.id, task.section_id)">

                <div class="d-flex align-items-center">
                    <img :src="getById(task.assignee, 'users').image"
                         :alt="getById(task.assignee, 'users').name"
                         width="28" class="rounded-circle me-2"
                         v-if="getById(task.assignee, 'users')">

                    <button v-else class="btn rounded-circle border border-2 shadow-none me-2"
                            style="padding: 0 4px; border-style: dashed !important;">
                        <i class="bi bi-person" aria-hidden="true"></i>
                    </button>

                    <small class="text-secondary d-block ml-3"
                           v-if="formatDate(task.due_date)"
                           v-text="formatDate(task.due_date)"/>

                    <button v-else class="btn rounded-circle border border-2 shadow-none me-2 small"
                            style="padding: 0 5px; border-style: dashed !important;">
                        <i class="bi bi-calendar small" aria-hidden="true"></i>
                    </button>
                </div>

                <span class="small" v-if="task.sub_tasks.length > 0">
                    <i class="bi bi-list-nested" aria-hidden="true"></i>
                    {{task.sub_tasks.length}}
                </span>

            </div>
        </div>
    </div>
</template>

<script>

import asanaMixin from "@/mixins/asanaMixin";

export default {
    name: "TaskItem",

    mixins:[asanaMixin],

    props:{
        task: {
            type: Object,
            required: true,
        }
    },

    methods:{
        openTask(tId, sId){
            this.$emit('open-task', {tId, sId})
        }
    }
}
</script>

<style lang="scss">
.task-item{

    transition: all .3s;

    .delete{
        right: 8px;
        top: 8px;
    }

    &:not(:hover){
        box-shadow: none !important;

        .delete{
            display: none;
        }
    }
}
</style>
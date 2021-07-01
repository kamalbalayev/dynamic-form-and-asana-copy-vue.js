<template>
    <div class="offcanvas offcanvas-end w-50" tabindex="-1" id="taskDetail" aria-labelledby="taskTitleInput">

        <div class="offcanvas-header" v-if="task">

            <button type="button" class="btn"
                    :class="task.completed ? 'btn-success' : 'btn-outline-secondary'"
                    @click="markComplete()">
                <i class="bi bi-check2 me-2" aria-hidden="true"></i>
                {{ task.completed ? 'Completed' : 'Mark complete' }}
            </button>

            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"/>

        </div>

        <hr class="m-0">

        <div class="offcanvas-body" v-if="task">

            <textarea id="taskTitleInput"
                      class="title-input h5 fw-bolder w-100 p-2" rows="2"
                      v-model="task.name" placeholder="Write a task name"/>

            <table class="w-100 mx-2">
                <tbody>
                <tr>

                    <th width="20%" class="py-2 text-left text-secondary small">Assignee</th>

                    <td width="80%" class="py-2">
                        <div class="btn-group">

                            <div data-bs-toggle="dropdown" aria-expanded="false"
                                 class="dropdown-toggle d-flex align-items-center">

                                <div class="d-flex align-items-center"
                                     v-if="getById(task.assignee, 'users')">

                                    <img :src="getById(task.assignee, 'users').image"
                                         :alt="getById(task.assignee, 'users').name"
                                         width="25" class="rounded-circle me-2">

                                    <span v-text="getById(task.assignee, 'users').name" class="me-2"/>

                                </div>

                                <div v-else>

                                    <button class="btn rounded-circle border border-2 shadow-none me-2"
                                            style="padding: 0 4px; border-style: dashed !important;">
                                        <i class="bi bi-person" aria-hidden="true"></i>
                                    </button>

                                    <small v-text="'No assignee'" class="me-2"/>

                                </div>
                            </div>

                            <ul class="dropdown-menu shadow-lg border-0">
                                <li v-for="(user, i) in users" :key="`user-${i}`">
                                    <span class="d-flex dropdown-item py-2 align-items-center"
                                          @click="task.assignee = user.id">

                                        <img :src="user.image" :alt="user.name"
                                             width="25" class="rounded-circle me-3">

                                        <span v-text="user.name" class="me-2"/>

                                        <small v-text="user.email" class="text-secondary"/>

                                    </span>
                                </li>
                            </ul>

                        </div>
                    </td>

                </tr>

                <tr>

                    <th width="20%" class="py-2 text-left text-secondary small">Due date</th>

                    <td width="80%" class="py-2">
                        <input v-model="task.due_date" :min="new Date().getDate()"
                               type="datetime-local" class="form-control shadow-none" style="width: 200px">
                    </td>

                </tr>

                <tr>

                    <th width="20%" class="py-2 text-left text-secondary small">Priority</th>

                    <td width="80%" class="py-2">

                        <div class="btn-group">

                            <button class="btn dropdown-toggle d-flex justify-content-start align-items-center"
                                    data-bs-toggle="dropdown" aria-expanded="false"
                                    style="width: 150px">

                                <span v-if="getById(task.priority, 'priority')"
                                      v-text="getById(task.priority, 'priority').name"
                                      class="badge rounded-pill me-1"
                                      :class="getById(task.priority, 'priority').color"/>

                                <span class="badge badge-light text-dark" v-else>--</span>
                            </button>

                            <ul class="dropdown-menu shadow-lg border-0">
                                <li>
                                    <span class="d-flex dropdown-item py-2 align-items-center"
                                          @click="task.priority = null">
                                        --
                                    </span>
                                </li>

                                <li v-for="(tag, i) in priority" :key="`user-${i}`">
                                    <span class="d-flex dropdown-item py-2 align-items-center"
                                          @click="task.priority = tag.id">

                                        <span v-text="tag.name" class="badge rounded-pill" :class="tag.color"/>
                                    </span>
                                </li>
                            </ul>

                        </div>


                    </td>

                </tr>

                <tr>

                    <th width="20%" class="py-3 text-left text-secondary small align-top">
                        Description
                    </th>

                    <td width="80%" class="py-1">

                        <textarea class="title-input w-100 p-2" rows="4"
                                  v-model="task.description"
                                  placeholder="Add more detail to this task"/>

                    </td>

                </tr>

                </tbody>
            </table>

            <template v-if="task.sub_tasks.length > 0">

                <small class="mx-2 fw-bold text-secondary mb-2 d-block" v-text="'Subtasks'"/>

                <table class="table border-top mx-2">
                    <tbody>
                    <tr v-for="(subTask, st) in task.sub_tasks" :key="`sub-task-${st}`"
                        :class="{'blue-light': subTask.name === ''}">

                        <td class="align-middle">
                            <i class="bi" :class="`bi-check-circle${subTask.completed ? '-fill text-success' : ''}`"
                               aria-hidden="true" @click="completeTask(task.id, task.section_id, subTask.id)"/>
                        </td>

                        <td width="100%">
                            <input type="text" v-model="subTask.name"
                                   @blur="blurTask(subTask)" :id="`sub-task-${subTask.id}`"
                                   class="border-0 transparent w-100" style="outline: none">
                        </td>

                    </tr>
                    </tbody>
                </table>

            </template>

            <button type="button" class="btn btn-light btn-sm mx-2" @click="addSubTask">
                <i class="bi bi-plus-lg me-2" aria-hidden="true"/>
                Add Subtask
            </button>

        </div>

    </div>
</template>

<script>

import asanaMixin from "@/mixins/asanaMixin";

export default {
    name: "TaskDetail",

    mixins: [asanaMixin],

    mounted() {
        const taskDetail = document.getElementById('taskDetail')

        taskDetail.addEventListener('hidden.bs.offcanvas', () => {

            !this.task?.name && !this.task?.description && this.deleteTask(this.task?.id, this.task?.section_id)
            this.setActive(false, 'taskDetail')

        })

        taskDetail.addEventListener('shown.bs.offcanvas', () => {

            setTimeout(() => {
                this.focusInput("#taskTitleInput")
            }, 50)

        })

    },

    computed: {

        sections() {
            return this.$store.state.asana.sections
        },

        activeSection() {
            const sId = this.getActive('activeSection')
            return this.sections.find(section => section.id === sId)
        },

        task() {
            const tId = this.getActive('activeTask')
            return this.activeSection?.tasks?.find(task => task.id === tId)
        },
    },
    methods: {

        markComplete() {
            const sId = this.getActive('activeSection')
            const tId = this.getActive('activeTask')
            this.completeTask(tId, sId)
        },

        addSubTask() {
            const si = this.sections.indexOf(this.activeSection)
            const sId = this.activeSection.id
            const tId = this.task.id

            this.$emit('add-sub-task', {si, sId, tId})

            setTimeout(() => {

                const sbtId = this.task.sub_tasks[this.task.sub_tasks.length - 1]?.id
                this.focusInput(`#sub-task-${sbtId}`)

            }, 50)
        },

        blurTask(sbt) {
            sbt.name === '' && this.deleteTask(this.task.id, this.task.section_id, sbt.id)
        }
    }
}
</script>

<style lang="scss">

.title-input {
    border-color: transparent;
    outline: none;

    &:focus, &:hover {
        border-color: #ddd;
    }
}

</style>
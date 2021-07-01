<template>
    <div class="form-wrap p-4 m-4 border">
        <div class="row">

            <div v-for="(field, i) in fields" :key="`field-${i}`"
                 class="col-12 d-flex align-items-center"
                 :class="`col-md-${field.css_style} order-${field.order}`">

                <field :field="field"
                       :value="form[`cf_${field.id}`]"
                       @value="setValue([`cf_${field.id}`], $event)"
                       :errors="errorMessage(field)"/>

            </div>

            <div class="col-12 d-flex justify-content-between">

                <button class="btn btn-info text-white" @click="save">
                    Save
                </button>

                <button class="btn btn-danger text-white" @click="remove" v-if="form.id">
                    Delete
                </button>

            </div>

        </div>

    </div>
</template>

<script>

import {validationMixin} from 'vuelidate'
import {required} from 'vuelidate/lib/validators'

export default {
    name: "Form",
    mixins: [validationMixin],

    components: {
        field: () => import('./fields/FieldWrap')
    },

    data() {
        return {
            fields: [],
            form: {},
        }
    },

    validations() {
        return {
            form: this.vForm()
        }
    },

    async created() {
        await this.getFields()
    },

    methods: {

        async getFields() {
            await this.axios.get('http://localhost:3000/fields').then(res => {

                this.fields = res.data

                if(this.$route.params.id){
                    this.getDataById(this.$route.params.id)
                }else{

                    let form = {}

                    this.fields.forEach(field => {
                        form[`cf_${field.id}`] = null
                    })

                    this.form = form
                }
            })
        },

        vForm() {
            let Obj = {}
            if (this.form !== {}) {
                this.fields?.forEach(field => {
                    if (field.is_required) {
                        Obj[`cf_${field.id}`] = {
                            required,
                        }
                    }
                })
            }
            return Obj
        },

        errorMessage(field) {
            let errors = []
            if (this.$v.form[`cf_${field.id}`]) {
                if (!this.$v.form[`cf_${field.id}`].$dirty) return errors;
                !this.$v.form[`cf_${field.id}`].required && errors.push('is required');

            }
            return errors

        },

        setValue(key, val){
            this.form[key] = val
            if(this.$v.form[key]){
                this.$v.form[key].$touch()
            }
        },

        async getDataById(id){
            await this.axios.get(`http://localhost:3000/posts/${id}`).then(res => {
                this.form = res.data
            })
        },

        async save() {
            this.$v.form.$touch()

            if(!this.$v.form.$anyError){

                if(this.form.id){
                    await this.axios.put(`http://localhost:3000/posts/${this.form.id}`, this.form).then(() => {
                        alert('Success!')
                    }).catch(() =>{
                        alert('Error!')
                    })
                }else{
                    await this.axios.post('http://localhost:3000/posts', this.form).then(() => {
                        alert('Success!')
                    }).catch(() =>{
                        alert('Error!')
                    })
                }

            }
        },

        async remove(){
            if(confirm('Delete this content?')){
                await this.axios.delete(`http://localhost:3000/posts/${this.form.id}`).then(() => {
                    alert('Success!')
                }).catch(() =>{
                    alert('Error!')
                })
            }
        }
    }
}
</script>
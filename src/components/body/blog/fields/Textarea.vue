<template>
    <div class="form-floating w-100 mb-4">
        <textarea v-model="model"
                  class="form-control"
                  :class="{'border-danger': errors.length > 0}"
                  :id="field.id"
                  :placeholder="field.place_holder"
                  style="min-height: 100px"/>

        <label :for="field.id" :class="{'text-danger': errors.length > 0}">
            {{field.name}} {{ errors.length > 0 ? errors[0] :  ''}}
        </label>

    </div>
</template>

<script>
export default {
    name: "Input",
    props: {
        field: {
            type: Object,
            required: true
        },
        errors: {
            type: Array,
        },
        value: {
            type: String,
        }
    },

    computed: {
        model: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('value', value);
            },
        },
    },
}
</script>
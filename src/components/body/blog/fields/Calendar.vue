<template>
    <div class="form-floating w-100 mb-4">
        <input v-model="model"
               type="datetime-local"
               min="2000-01-01T00:00"
               class="form-control"
               :class="{'border-danger': errors.length > 0}"
               :id="field.id"
               :placeholder="field.place_holder">

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
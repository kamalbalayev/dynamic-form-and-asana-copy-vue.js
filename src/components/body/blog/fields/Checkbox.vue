<template>
    <div class="form-check w-100 mb-4">
        <input v-model="model"
               type="checkbox"
               class="form-check-input"
               :class="{'border-danger': errors.length > 0}"
               :id="field.id"
               :placeholder="field.place_holder">

        <label :for="field.id" class="form-check-label" :class="{'text-danger': errors.length > 0}">
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
            type: Boolean,
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
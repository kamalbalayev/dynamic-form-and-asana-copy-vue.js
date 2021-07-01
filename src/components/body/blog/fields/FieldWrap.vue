<template>
    <component :is="fieldComponent"
               :field="field"
               :errors="errors"
               :value="value"
               @value="emitVal($event)"/>
</template>

<script>
export default {
    name: "FieldWrap",
    props: {
        field: {
            type: Object,
            required: true
        },
        errors: {
            type: Array,
        },
        value: {}
    },
    computed: {
        fieldComponent() {
            let component;

            switch (this.field.input_type) {
                case 'textbox':
                    component = 'Input';
                    break;
                case 'calendar':
                    component = 'Calendar';
                    break;
                case 'text':
                    component = 'Textarea';
                    break;
                case 'smart_ddl':
                    component = 'Select';
                    break;
                case 'checkbox':
                    component = 'Checkbox';
                    break;

            }

            return ()=> import(`./${component}`)
        }
    },
    methods:{
        emitVal(e){
            this.$emit('value', e)
        }
    }
}
</script>
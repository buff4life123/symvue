<script>
    import { VTextField } from 'vuetify/lib'

    import {inputRestriction, outputRestriction, defaultProps as restriction_props} from '../../';

    export default VTextField.extend({
        name: 'dw-text-field',

        props: {
            ...restriction_props,  
        },

        // watch: {
        //     internalValue: function (val, oldval) {
        //         this.internalValue = this.inputRestriction(val);
        //     },
        // },

        methods: {
            inputRestriction,
            outputRestriction,

            onInput(e) {
                const target = e.target;
                this.internalValue = target.value;
                this.$nextTick(() => {
                    this.internalValue = this.inputRestriction(target.value);
                    this.badInput = target.validity && target.validity.badInput;
                });
            },

            onBlur(e) {
                this.isFocused = false;
                e && this.$nextTick(() => {
                    this.internalValue = this.outputRestriction(this.internalValue);
                    this.$emit('blur', e)
                });
            },
        }
    });
</script>

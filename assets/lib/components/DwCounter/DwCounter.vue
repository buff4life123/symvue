<script>
    import { VCounter } from 'vuetify/lib'

    import { functionalThemeClasses } from 'vuetify/lib/mixins/themeable';

    export default {
        name: 'dw-counter',

        extends: VCounter,

        props: {
            min: [Number, String]
        },

        render(h, ctx) {
            let {
                props
            } = ctx;
            let max = parseInt(props.max, 10);
            let min = parseInt(props.min, 10);
            let value = parseInt(props.value, 10);
            let isLower = min && value < min;
            let isGreater = max && value > max;
            let content = max ? `${value} / ${max}` : String(props.value);
            if (isLower && min) {
                content = `${min} / ${value}`;
            }
            return h('div', {
                staticClass: 'v-counter',
                class: {
                    'error--text': isGreater || isLower,
                    ...functionalThemeClasses(ctx)
                }
            }, content);
        }
    }
</script>
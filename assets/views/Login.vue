<template>
    <v-img
        src="https://demos.creative-tim.com/vuetify-material-dashboard-pro/img/login.d6d3bb09.jpg"
        width="100%"
        height="100%"
    >
        <v-container id="login" fill-height>
            <v-row justify="center">
                <material-card
                    color="green"
                    style="max-width: 100%; width: 400px;"
                >
                    <template v-slot:header>
                        <div class="text-center pa-7" style="width: 100%;">
                            <h1 class="display-2 font-weight-bold mb-2">Login</h1>
                            <v-btn text icon color="primary">
                                <v-icon>mdi-facebook-box</v-icon>
                            </v-btn>
                            <v-btn text icon>
                                <v-icon>mdi-twitter</v-icon>
                            </v-btn>
                            <v-btn text icon>
                                <v-icon>mdi-github-box</v-icon>
                            </v-btn>
                        </div>
                    </template>

                    <v-card-text class="text-center">

                        <div class="text-center grey--text body-1 font-weight-light">Or Be Classical</div>
                        <v-text-field
                            class="mt-10"
                            label="First Name..."
                            prepend-icon="mdi-face"
                        ></v-text-field>
                        <v-text-field
                            label="Email..."
                            prepend-icon="mdi-email"
                        ></v-text-field>
                        <v-text-field
                            class="mb-8"
                            label="Password..."
                            prepend-icon="mdi-lock-outline"
                        ></v-text-field>
                        <!-- <v-checkbox
                          label="Remember me"
                        ></v-checkbox> -->
                        <v-btn rounded text large color="green">Let's Go</v-btn>
                    </v-card-text>
                </material-card>
            </v-row>
        </v-container>

    </v-img>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'Login',
    data: function() {
        return {
            togle_label: false,
            label1: 'label1',
            label2: 'label2123213123',
            telephone: '+3519',
            telephone2: 'abc',
            components: [
                'Autocompletes', 'Comboboxes', 'Forms', 'Inputs', 'Overflow Buttons', 'Selects', 'Selection Controls', 'Sliders', 'Textareas', 'Text Fields',
            ],
        }
    },

    watch: {
        telephone: function (val, oldval) {
            console.log(val);
        },
        telephone2: function (val, oldval) {
            console.log(val);
        },
    },
    computed: {
        // If you have only one state/getter object spread operators are not necessarily needed
        // But we'll use it for now, so you can see how they are used
        // mapState/mapGetter accepts an array of strings as parameter
        ...mapState(['totalTvCount']),
        ...mapGetters(['happyStaff'])
    },
    methods: {
        ...mapActions(['removeTv']),
        toggle(index, value, event) {
            console.log(`update ${index} ${value} ${event}`);
            this.$store.commit('update', { index, value })
        }
    },
    mounted: function() {
        // this.$nextTick(() => {
        //     this.telephone = "abc";
        // });
        // console.log(this.happyStaff);
        // console.log(this.totalTvCount);
        // console.log(this.removeTv(2));
        // // console.log(this.$store.dispatch('removeTv', 2));
        // console.log(this.$store.state.totalTvCount);
    }
}
</script>

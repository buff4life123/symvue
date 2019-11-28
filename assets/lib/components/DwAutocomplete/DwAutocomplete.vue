<script>
    import { VAutocomplete, VCombobox, VIcon, VImg, VSelect } from 'vuetify/lib'

    import { keyCodes, convertToUnit, kebabCase } from 'vuetify/lib/util/helpers';

    import { DwSelectList, DwCounter, inputRestriction, outputRestriction, defaultProps as restrictionProps, number, country, adjective } from '../../'

    // this.setLabelWidth, this.setPrefixWidth, this.setPrependWidth
    
    import { AsYouType, parsePhoneNumber } from 'libphonenumber-js'

    export default {
        name: 'dw-autocomplete',

        extends: VAutocomplete,

        data: function() {
            return {
                selectDropdown: false,
                lazySelect: undefined
            }
        },

        props: {
            ...restrictionProps,
            appendIcon: {
                type: String,
                default: ''
            },
            buttonSlot: {
                type: String,
                default: 'prepend' // [prepend,append]
            },
            items: {
                type: Array,
                default: number
            },
            default_item: {
                type: String,
                default: 'pt'
            },
            list_image: {
                type: String,
                default: 'code'
            },
            list_title: {
                type: [String, Array],
                default: 'name'
            },
            list_subtitle: {
                type: [String, Array],
                default: () => [
                    '+',
                    {
                        value: 'dialCode',
                        type: 'index'
                    }
                ]
            },
            filter: {
                type: Function,
                default: function(item, queryText, itemText) {
                    return this.genDisplayText(item, this.list_title).toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1 ||
                        this.genDisplayText(item, this.list_subtitle).toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1;
                }
            },
            autoSelectFirst: {
                type: Boolean,
                default: true
            },
            externalValueGet: {
                type: Function,
                default: function(val, selectValue, defaultSelectValue) {
                    try {
                        let phoneNumber = new parsePhoneNumber(String(val), selectValue?selectValue.code.toUpperCase():defaultSelectValue.toUpperCase());
                        return phoneNumber.number;
                    } catch (error) {
                        if (!val || val.toString().indexOf('+') > -1) {
                            return val;
                        } else {
                            return "+"+selectValue.dialCode+val;
                        } 
                    }
                }
            },
            externalValueSet: {
                type: Function,
                default: function(val, defaultSelectValue) {
                    if (val) {
                        try {
                            let phoneNumber = new parsePhoneNumber(String(val), defaultSelectValue.toUpperCase());
                            this.lazyValue = new AsYouType(phoneNumber.country).input(phoneNumber.nationalNumber);
                            this.internalSelect = this.setSelectedItem(phoneNumber.country);
                        } catch (error) {
                            this.lazyValue = val;
                            this.internalSelect = this.setSelectedItem(defaultSelectValue);
                        }
                    } else {
                        this.lazyValue = val;
                        this.internalSelect = this.setSelectedItem(defaultSelectValue);
                    }
                }
            },
            setSelectedItem: {
                type: Function,
                default: function(code) {
                    return this.items.find(x => x.code.toUpperCase() === code.toUpperCase());
                }
            },
            counter: [Number, String, Array]
        },

        watch: {
            lazyValue: function (val, oldval) {},
            lazySearch: function (val, oldval) {},
            lazySelect: function (val, oldval) {},
            selectDropdown: function(e) {
                if (!e) {
                    this.internalSearch = '';
                    this.isMenuActive = false;
                }
            },
            internalValue(val, oldVal) {

            },
            value: function(val, oldVal) {
                this.externalValue = val;
            },
        },

        computed: {
            isDirty() {
                return this.menuCanShow ? this.searchIsDirty : this.inputIsDirty;
            },

            staticList() {
                if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
                    consoleError('assert: staticList should not be called if slots are used');
                }

                return this.$createElement(DwSelectList, this.listData);
            },

            listData() {
                let scopeId = this.$vnode && this.$vnode.context.$options._scopeId;
                let attrs = scopeId ? {
                    [scopeId]: true
                } : {};
                return {
                    attrs: { ...attrs,
                        id: this.computedOwns
                    },
                    props: {
                        action: this.multiple,
                        color: this.itemColor,
                        dense: this.dense,
                        hideSelected: this.hideSelected,
                        items: this.virtualizedItems,
                        itemDisabled: this.itemDisabled,
                        itemText: this.itemText,
                        itemValue: this.itemValue,
                        noDataText: this.$vuetify.lang.t(this.noDataText),
                        selectedItems: this.selectedItems,
                        list_image: this.list_image,
                        list_title: this.list_title,
                        list_subtitle: this.list_subtitle,
                        searchInput: this.internalSearch,
                    },
                    on: {
                        select: this.selectItem
                    },
                    scopedSlots: {
                        item: this.$scopedSlots.item
                    }
                };
            },

            menuCanShow() {
                return this.selectDropdown;
            },

            selectedCountry() {
                return this.internalSelect;
            },

            inputIsDirty() {
                return this.internalValue != null && this.internalValue !== '';
            },

            internalValue: {
                get() {
                    return this.lazyValue;
                },

                set(val) {
                    this.externalValueSet(val, this.internalSelect?this.internalSelect.code:this.default_item )
                    this.$emit('input', this.externalValue);
                }
            },

            internalSearch: {
                get() {
                    return this.lazySearch;
                },

                set(val) {
                    this.lazySearch = val;
                    this.$emit('update:search-input', val);
                }
            },

            internalSelect: {
                get() {
                    return this.lazySelect;
                },

                set(val) {
                    this.lazySelect = val;
                    this.$emit('change', val);
                    this.$emit('input', this.externalValue);
                }
            },

            externalValue: {
                get() {
                    return this.externalValueGet(this.internalValue, this.internalSelect, this.default_item);
                },
                set(val) {
                    this.externalValueSet(val, this.default_item);
                },
            },

            counterValue() {
                return (this.externalValue || '').toString().length;
            },
        },

        methods: {
            setSelectedItems() {
                let selectedItems = [];
                let values = !this.multiple || !Array.isArray(this.internalSelect) ? [this.internalSelect] : this.internalSelect;

                for (let value of values) {
                    let index = this.allItems.findIndex(v => this.valueComparator(this.getValue(v), this.getValue(value)));

                    if (index > -1) {
                    selectedItems.push(this.allItems[index]);
                    }
                }

                this.selectedItems = selectedItems;
            },

            genInput() {
                let listeners = Object.assign({}, this.listeners$);
                delete listeners['change']; // Change should not be bound externally

                return this.$createElement('input', {
                    style: {},
                    domProps: {
                        value: this.menuCanShow?this.lazySearch:this.lazyValue
                    },
                    attrs: { ...this.attrs$,
                        autofocus: this.autofocus,
                        disabled: this.disabled,
                        id: this.computedId,
                        placeholder: this.placeholder,
                        readonly: this.readonly,
                        type: this.type
                    },
                    on: Object.assign(listeners, {
                        blur: this.onBlur,
                        input: this.onInput,
                        focus: this.onFocus,
                        keydown: this.onKeyDown
                    }),
                    ref: 'input'
                });
            },

            genDisplayText(item, e) {
                if (typeof e == 'string') {
                    return this.getText(item[e])
                } else if (typeof e == 'object' && e.length) {
                    let temp = [];
                    e.forEach((element) => {
                        if (typeof element == 'string') {
                            temp.push(this.getText(element))
                        } else if(typeof element == 'object') {
                            switch (element.type) {
                                case 'index':
                                    temp.push(this.getText(item[element.value]));
                                break;
                                default:
                                    temp.push(this.getText(element.value));
                                break;
                            }
                        }
                    });
                    return temp.join('');
                } else {
                    return undefined;
                }
            },

            genListWithSlot() {
                let slots = ['prepend-item', 'no-data', 'append-item'].filter(slotName => this.$slots[slotName]).map(slotName => this.$createElement('template', {
                    slot: slotName
                }, this.$slots[slotName])); // Requires destructuring due to Vue
                // modifying the `on` property when passed
                // as a referenced object

                return this.$createElement(DwSelectList, { ...this.listData
                }, slots);
            },
            inputRestriction,
            genPrependInnerSlot() {
                let slot = [];

                if (this.buttonSlot == "prepend") {
                    slot.push(this.genImage('prependInner', this.toggleSelectMenu));
                } else if (this.$slots['prepend-inner']) {
                    slot.push(this.$slots['prepend-inner']);
                } else if (this.prependInnerIcon) {
                    slot.push(this.genIcon('prependInner'));
                }

                return this.genSlot('prepend', 'inner', slot);
            },
            genAppendSlot() {
                let slot = [];

                if (this.buttonSlot == "append") {
                    slot.push(this.genImage('append', this.toggleSelectMenu));
                } else if (this.$slots.append) {
                    slot.push(this.$slots.append);
                } else if (this.appendIcon) {
                    slot.push(this.genIcon('append'));
                }

                return this.genSlot('append', 'outer', slot);
            },
            toggleSelectMenu(e) {
                if (!this.menuCanShow && (this.selectDropdown = true)) {
                    if (this.isDisabled) return;
                    this.selectedIndex > -1 ? this.selectedIndex = 0 : this.onFocus();
                    this.activateMenu();
                } else {
                    this.selectDropdown = false;
                    this.isMenuActive = false;
                }
            },
            genImage(type, cb) {
                let icon = this[`${type}Icon`];
                let eventName = `click:${kebabCase(type)}`;
                let data = {
                    ref:"genImage",
                    class: [
                        'grey',
                        (this.selectedCountry?"flag-icon flag-icon-"+this.selectedCountry['code']:"")
                    ],
                    style: {
                        'border-radius': '4px',
                        height: "24px",
                        width: "32px",
                        "-webkit-background-size": "cover",
                        "-moz-background-size": "cover",
                        "-o-background-size": "cover",
                        "background-size": "cover",
                        cursor:(!this.isDisabled?'pointer':undefined)
                    },
                    on: !(this.listeners$[eventName] || cb) ? undefined : {
                        click: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            this.$emit(eventName, e);
                            cb && cb(e);
                        },
                        mouseup: e => {
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    }
                };
                return this.$createElement("span", data, icon);
            },
            clearableCallback() {
                this.setValue(this.multiple ? [] : undefined);
                this.$nextTick(() => this.$refs.input && this.$refs.input.focus());
                this.isMenuActive = false;
            },
            onInput(e) {
                if (this.menuCanShow && (this.selectedIndex > -1 || !e.target)) return;
                let target = e.target;
                let value = target.value; // If typing and menu is not currently active

                if (this.menuCanShow) {
                    this.internalSearch = value;
                } else {
                    this.internalValue = value;
                }
            },
            onBlur(e) {
                this.selectDropdown = false;
                e && this.$emit('blur', e);
            },
            selectItem(item) {
                this.selectDropdown = false;
                this.internalSelect = item;
            },

            updateSelf() {
                // if (this.menuCanShow) {
                //     // this.updateSelect();
                // } else {
                //     // this.updateInput();
                // }
            },

            onEnterDown(e) {
                e.preventDefault();
                this.$nextTick(() => {
                    if (this.menuCanShow && this.getMenuIndex() > -1) return;
                    this.menuCanShow && (this.selectDropdown = false);
                    // this.updateSelf();
                });
            },
            onKeyDown(e) {
                let keyCode = e.keyCode;
                VSelect.options.methods.onKeyDown.call(this, e); // If user is at selection index of 0
 
                if (!this.menuCanShow || this.multiple && keyCode === keyCodes.left && this.$refs.input.selectionStart === 0) {
                    // this.updateSelf();
                } else if (keyCode === keyCodes.enter) {
                    this.onEnterDown(e);
                }

                if (this.menuCanShow) {
                    this.changeSelectedIndex(keyCode);
                }
            },
            setSearch() {
                // Wait for nextTick so selectedItem
                // has had time to update
                this.menuCanShow && this.$nextTick(() => {
                    if (!this.multiple || !this.internalSearch || !this.isMenuActive) {
                        this.internalSearch = !this.selectedItems.length || this.multiple || this.hasSlot ? null : this.getText(this.selectedItem);
                    }
              });
            },

            genCounter() {
                if (this.counter === false || this.counter == null) return null;

                if (typeof this.counter == 'string' || typeof this.counter == 'number' || typeof this.counter == 'boolean') {
                    let max = this.counter === true ? this.attrs$.maxlength : this.counter;
                    return this.$createElement(DwCounter, {
                        props: {
                            dark: this.dark,
                            light: this.light,
                            max,
                            value: this.counterValue
                        }
                    });
                } else if (typeof this.counter == 'object') {
                    let min = this.counter[0];
                    let max = this.counter[1];

                    if (min > max) {
                        let temp = max;
                        max = min;
                        min = temp; 
                    }

                    return this.$createElement(DwCounter, {
                        props: {
                            dark: this.dark,
                            light: this.light,
                            max,
                            min,
                            value: this.counterValue
                        }
                    });    
                }

                
            },
        },

        created: function() {
            this.externalValue = "";
            this.externalValue = this.value;
        }
    }
</script>


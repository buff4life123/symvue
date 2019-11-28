<script>
    import { VList, VListItem, VListItemAction, VListItemContent, VListItemTitle, VListItemSubtitle } from 'vuetify/lib/components/VList';
    import VSelectList from 'vuetify/lib/components/VSelect/VSelectList'
    import VImg from 'vuetify/lib/components/VImg/VImg'

    export default {
        name: 'dw-select-list',

        extends: VSelectList,

        props: {
            list_image: {
                type: String,
            },
            list_title: {
                type: [String, Array],
            },
            list_subtitle: {
                type: [String, Array],
            }
        },

        methods: {
            // genTile(item, disabled = null, value = false) {
            //     if (!value) value = this.hasItem(item);

            //     if (item === Object(item)) {
            //         disabled = disabled !== null ? disabled : this.getDisabled(item);
            //     }

            //     const tile = {
            //         attrs: {
            //             // Default behavior in list does not
            //             // contain aria-selected by default
            //             'aria-selected': String(value),
            //             'aria-labelledby': this.genLabelledBy(item),
            //             role: 'option'
            //         },
            //         on: {
            //             mousedown: e => {
            //                 // Prevent onBlur from being called
            //                 e.preventDefault();
            //             },
            //             click: () => disabled || this.$emit('select', item)
            //         },
            //         props: {
            //             activeClass: this.tileActiveClass,
            //             disabled,
            //             ripple: true,
            //             inputValue: value
            //         }
            //     };

            //     if (!this.$scopedSlots.item) {
            //         return this.$createElement(VListItem, tile, [this.action && !this.hideSelected && this.items.length > 0 ? this.genAction(item, value) : null, this.genTileContent(item)]);
            //     }

            //     const parent = this;
            //     const scopedSlot = this.$scopedSlots.item({
            //         parent,
            //         item,
            //         attrs: {
            //             ...tile.attrs,
            //             ...tile.props
            //         },
            //         on: tile.on
            //     });
            //     return this.needsTile(scopedSlot) ? this.$createElement(VListItem, tile, scopedSlot) : scopedSlot;
            // },
            
            genDisplayText(item, e) {
                if (typeof e == 'string') {
                    return this.genFilteredText(this.getText(item[e]))
                } else if (typeof e == 'object' && e.length) {
                    let temp = [];
                    e.forEach((element) => {
                        if (typeof element == 'string') {
                            temp.push(this.getText(element));
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
                    return this.genFilteredText(temp.join(''));
                } else {
                    return undefined;
                }
            },

            genTileContent(item) {
                if (typeof item !== 'object') {
                    let innerHTML = this.genFilteredText(this.getText(item))
                    return this.$createElement(VListItemTitle, {
                        attrs: {
                            id: this.genLabelledBy(item)
                        },
                        domProps: {
                            innerHTML
                        }
                    })
                } else {
                    let title = this.genDisplayText(item, this.list_title);
                    let subtitle = this.genDisplayText(item, this.list_subtitle);
                    return [
                        (this.list_image && item[this.list_image]?this.$createElement(VListItemContent, {
                            staticClass: "dw_list_image mr-1",
                            style: {
                                'flex': 'unset',
                                'width': '32px'
                            },
                        },[
                            this.$createElement('span', {
                                staticClass: "grey "+(item[this.list_image]?"flag-icon flag-icon-"+item[this.list_image]:""),
                                ref:"genImage",
                                style: {
                                    'border-radius': '4px',
                                    height: "24px",
                                    width: "32px",
                                    "-webkit-background-size": "cover",
                                    "-moz-background-size": "cover",
                                    "-o-background-size": "cover",
                                    "background-size": "cover", 
                                }
                            }),
                        ]): undefined),
                        this.$createElement(VListItemContent, [
                            this.$createElement(VListItemTitle, {
                                attrs: {
                                    id: this.genLabelledBy(title)
                                },
                                domProps: {
                                    innerHTML: title
                                }
                            }),
                            (subtitle ? this.$createElement(VListItemSubtitle, {
                                attrs: {
                                    id: this.genLabelledBy(subtitle)
                                },
                                domProps: {
                                    innerHTML: subtitle
                                }
                            }): undefined)
                        ])
                    ];
                }
            },

            getMaskedCharacters(text) {
                const searchInput = (this.searchInput || '').toString().toLocaleLowerCase();
                const index = text.toLocaleLowerCase().indexOf(searchInput);
                if (index < 0) return {
                    start: text,
                    middle: '',
                    end: ''
                };
                const start = text.slice(0, index);
                const middle = text.slice(index, index + searchInput.length);
                const end = text.slice(index + searchInput.length);
                return {
                    start,
                    middle,
                    end
                };
            },
        }
    }
</script>
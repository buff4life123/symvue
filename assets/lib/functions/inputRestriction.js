export const defaultProps = {
    input_type: {
        type: String,
        default: '' // ['','number']
    },
    input_type_restriction: {
        type: String,
        default: '' // ['','positive_float','negative_float','positive_int','negative_int']
    }
}

export const outputRestriction = function(val) {
    // console.log(this.input_type, this.input_type_restriction, val);
    if (val) switch (this.input_type) {
        case 'number':
            val = String(val).replace(/[^\+\-0-9\.\,]/g, '').replace(/,/g, '.');

            let pattern = /[-+]{0,1}([\d]+[\.]{0,1}[\d]+|[\d]+)/gm;

            switch (this.input_type_restriction) {
                case 'positive_float':
                    pattern = /[+]{0,1}([\d]+[\.]{0,1}[\d]+|[\d]+)/gm;
                break;

                case 'negative_float':
                    pattern = /[-]([\d]+[\.]{0,1}[\d]+|[\d]+)/gm;
                break;

                case 'positive_int':
                    pattern = /[+]{0,1}[\d]+/gm;
                break;

                case 'negative_int':
                    pattern = /[-][\d]+/gm;
                break;
            }
            if (val && (val = val.match(pattern))) {
                return val[0];
            } else {
                return val;
            }
        break;
    }

    return val;
}

export const inputRestriction = function(val) {
    // console.log(this.input_type, this.input_type_restriction, val);

    if (val) switch (this.input_type) {
        case 'number':
            val = String(val).replace(/[^\+\-0-9\.\,]/g, '').replace(/,/g, '.');

            let pattern = /[-+]{0,1}([\d]+[\.]{0,1}[\d]*|[\d]*)/gm;

            switch (this.input_type_restriction) {
                case 'positive_float':
                    pattern = /[+]{0,1}([\d]+[\.]{0,1}[\d]*|[\d]*)/gm;
                break;

                case 'negative_float':
                    pattern = /[-]([\d]+[\.]{0,1}[\d]*|[\d]*)/gm;
                break;

                case 'positive_int':
                    pattern = /[+]{0,1}[\d]*/gm;
                break;

                case 'negative_int':
                    pattern = /[-][\d]*/gm;
                break;
            }
            if (val && (val = val.match(pattern))) {
                return val[0];
            } else {
                return '';
            }
        break;
    }

    return val ? val : '';
}

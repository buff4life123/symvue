/**
 * Install plugin
 * @param Vue
 * @param ajax
 */

import {ajax, ajaxSetup} from 'jquery';

function plugin(Vue, options) {
    const baseUrl = options && options.baseUrl;

    if (plugin.installed) {
        return;
    }

    ajaxSetup({
        type: "POST",
        crossOrigin: true,
        error: (xhr,status,error) => {
            console.log(xhr,status,error);
        },
    });
    if (options && options.error) {
        ajaxSetup({
            error: options.error
        });
    }
    if (baseUrl) {
        ajaxSetup({
            beforeSend: function(xhr, options) {
                if (!/\/\//.test(options.url)) {
                    options.url = baseUrl + options.url.replace(/^\//g, '');
                }
            }
        })
    }
    
    Vue.ajax = ajax;

    const get = function() {
        ajaxSetup({ 
            context: this,
            headers: { 'x-api-Key': 'some value' }
        });
        return Vue.ajax;
    }

    Object.defineProperties(Vue.prototype, {
        $http: {
            get
        },

        $ajax: {
            get
        },
    });
}

export default plugin;
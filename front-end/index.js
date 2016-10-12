global.system = require('./system/system');

require('./libs/libs');
require('./modules/modules');

global.constants = require('./app/constants/constants');

global.channels = require('./system/channels');
global.mediator = require('./system/mediator');

if($.cookie('login') && $.cookie('isAdmin')){
    system.user = {
        login: $.cookie('login'),
        isAdmin: $.cookie('isAdmin') === 'true'
    };
}

if(channels && mediator){
    _.forEach(channels, function(properties) {
        mediator.subscribe(properties, function(data, callback){
            if(properties.url){
                var url = NODE_ENV.trim() === 'development' ? 'http://localhost' + properties.url : properties.url;
                $.ajax({
                    url: url,
                    data: data,
                    type: "POST",
                    success: function(response){
                        if(callback && typeof(callback) === 'function'){
                            callback(response && typeof(response) === "string" ? JSON.parse(response) : response);
                        }
                    }
                });
            }else if(properties.method && typeof(properties.method) === 'function'){
                properties.method(data, callback && typeof(callback) === 'function' ? callback : function(){});
            }
        });
    });
}

require('./system/router');
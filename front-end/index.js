window.system = require('./system/system');

require('./libs/libs');
require('./modules/modules');

window.constants = require('./app/constants/constants');

window.channels = require('./system/channels');
window.mediator = require('./system/mediator');

if(channels && mediator){
    _.forEach(channels, function(properties) {
        mediator.subscribe(properties, function(data, callback){
            if(properties.method && typeof(properties.method) === 'function'){
                properties.method(data, callback && typeof(callback) === 'function' ? callback : function(){});
            }
        });
    });
}

require('./system/router');
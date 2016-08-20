import channels from './channels';
import paths from './paths';

class Mediator{
    constructor(){
        this.channels = {};


    }
    publish(properties) {
        if (!this.channels[properties.channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[properties.channel].length; i < l; i++) {
            var subscription = this.channels[properties.channel][i];

            subscription.callback.apply(subscription.context, args);
        }
        return this;
    }
    subscribe(properties, fn) {
        if (!this.channels[properties.channel]) this.channels[properties.channel] = [];
        this.channels[properties.channel].push({ context: this, callback: fn });
        return this;
    }
}

const mediator = new Mediator;
//export default mediator;

if(channels && paths){
    _.forEach(channels, function(properties) {
        mediator.subscribe(properties, function(data, callback){
            if(properties.path){
                var pathArr = _.without(properties.path.split('/'), '');
                var fn = paths[pathArr[0]][pathArr[1]][pathArr[2]];
                if(fn && typeof(fn) === 'function'){
                    var result = fn(data);
                    if(typeof(callback) === 'function'){
                        callback(result);
                    }
                }
            }
        });
    });
}

mediator.publish(channels.LOGIN_GET_LIST, null, function(result){
    console.log('result', result)
});
//window.mediator = new Mediator;
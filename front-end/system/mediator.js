function Mediator(){
    this.channels = {};

    this.publish = function(properties) {
        if (!properties || !this.channels[properties.channel]) return false;
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[properties.channel].length; i < l; i++) {
            var subscription = this.channels[properties.channel][i];

            subscription.callback.apply(subscription.context, args);
        }
        return this;
    };

    this.subscribe = function(properties, fn) {
        if (!this.channels[properties.channel]) this.channels[properties.channel] = [];
        this.channels[properties.channel].push({ context: this, callback: fn });
        return this;
    }
}

module.exports = new Mediator;
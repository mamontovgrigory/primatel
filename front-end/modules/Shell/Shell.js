class Shell{
    notification(properties){
        Materialize.toast(properties.text, 2000);
    }
}

module.exports = new Shell();
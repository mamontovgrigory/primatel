class Authorization{
    login(properties, callback){
        var success = false;
        var message = '';
        if(properties.login === 'test' && properties.password === 'test'){
            system.user = {
                login: 'test',
                name: 'test'
            };
            success = true;
        } else {
            message = 'Неправильный логин или пароль';
        }
        callback({
            success: success,
            message: message
        });
    }
}

module.exports = new Authorization;
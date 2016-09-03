class Clients extends React.Component{
    getList(properties, callback){
        callback([
            {
                id: 1,
                name: 'Ауди Варшавка'
            },
            {
                id: 2,
                name: 'Автомир Киа'
            },
            {
                id: 3,
                name: 'Киа Автостарт'
            },
            {
                id: 4,
                name: 'Фаворит'
            },
            {
                id: 5,
                name: 'Ралли'
            },
            {
                id: 6,
                name: 'Хендай Сити'
            },
            {
                id: 7,
                name: 'Мб Белево'
            },
            {
                id: 8,
                name: 'Автотемп'
            }
        ]);
    }
}

module.exports = Clients;
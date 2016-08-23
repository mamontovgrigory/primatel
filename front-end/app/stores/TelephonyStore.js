class TelephonyStore extends React.Component{
    getCallTotals(properties, callback){
        callback([
            {
                id: 1,
                data: ['04.08.2016','05.08.2016','06.08.2016','07.08.2016','08.08.2016','09.08.2016']
            },
            {
                id: 2,
                name: 'Ауди Варшавка',
                data: [15,12,10,28,21,11]
            },
            {
                id: 3,
                name: 'Хендай Сити',
                data: [15,12,10,28,21,11]
            },
            {
                id: 4,
                name: 'Киа Автостарт',
                data: [15,12,10,28,21,11]
            },
            {
                id: 5,
                name: 'Фаворит',
                data: [15,12,10,28,21,11]
            }
        ]);
    }
}

const telephonyStore = new TelephonyStore;
export default telephonyStore;
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

    getCallsDetails(properties, callback){
        callback([
            {
                datetime: '09:19:21 01.07.2016',
                numFrom: '+7 (921) 940-00-99',
                numTo: '+7 (499) 641-36-65',
                duration: 126
            },
            {
                datetime: '09:19:21 01.07.2016',
                numFrom: '+7 (921) 940-00-99',
                numTo: '+7 (499) 641-36-65',
                duration: 126
            },
            {
                datetime: '09:19:21 01.07.2016',
                numFrom: '+7 (921) 940-00-99',
                numTo: '+7 (499) 641-36-65',
                duration: 126
            },
            {
                datetime: '09:19:21 01.07.2016',
                numFrom: '+7 (921) 940-00-99',
                numTo: '+7 (499) 641-36-65',
                duration: 126
            },
            {
                datetime: '09:19:21 01.07.2016',
                numFrom: '+7 (921) 940-00-99',
                numTo: '+7 (499) 641-36-65',
                duration: 126
            },
            {
                datetime: '09:19:21 01.07.2016',
                numFrom: '+7 (921) 940-00-99',
                numTo: '+7 (499) 641-36-65',
                duration: 126
            },
            {
                datetime: '09:19:21 01.07.2016',
                numFrom: '+7 (921) 940-00-99',
                numTo: '+7 (499) 641-36-65',
                duration: 126
            },
            {
                datetime: '09:19:21 01.07.2016',
                numFrom: '+7 (921) 940-00-99',
                numTo: '+7 (499) 641-36-65',
                duration: 126
            }
        ]);
    }
}

const telephonyStore = new TelephonyStore;
export default telephonyStore;
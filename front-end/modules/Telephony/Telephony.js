class Telephony{
    getReport(properties){
        location.href = system.serverUrl + '/get_report.php?' + $.param(properties);
    }
}

module.exports = new Telephony();
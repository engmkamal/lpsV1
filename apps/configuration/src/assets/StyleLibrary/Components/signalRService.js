app.service('signalRService', function (dialogService, $timeout) {

    var signalRService = {};

    signalRService.trigedSubmit = false;

    signalRService.CPRStart = function (cprId) {
        try {

            var applicationHub = $.connection.applicationHub;

            applicationHub.client.addNewMessageToPage = function (cprno, success) {
                
                if (cprId == cprno && signalRService.trigedSubmit == false) {
                    dialogService.ShowDialog('', global._sameApplicationOpion);
                    $timeout(function () {
                        window.location.href = common.cprRedirectUrl.replace("@cprno", cprId);
                    }, 2000);
                }
            };

            $.connection.hub.start().done(function () {
            });
        } catch (e) {
            alert("signalRService Start "+e);
        }
    }

    return signalRService;
});
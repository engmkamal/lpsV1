app.factory('dialogService', ["$mdDialog",function ($mdDialog) {
    var dialogService = {};

    dialogService.ShowDialog = function (title, msg) {
        return $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .title(title)
                .textContent(msg)
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')
        );
    };

    dialogService.ConfirmDialogWithYesNo = function (title, msg) {
        var dialog = $mdDialog.confirm()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .title(title)
            .textContent(msg)
            .ariaLabel('Alert Dialog Demo')
            .ok('Yes')
            .cancel('No');

        return $mdDialog.show(dialog);
    };

    dialogService.ConfirmDialogWithOkay = function (title, msg) {
        return $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .title(title)
                .textContent(msg)
                //.textContent('Cannot removed This security offer')
                .ariaLabel('Alert Dialog Demo')
                .ok('OK')

        );
    };

    dialogService.CustomDialog = function (page, dialogController) {
        return $mdDialog.show({
            controller: dialogController,
            templateUrl: page,
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    }

    dialogService.Hide = function () {
        $mdDialog.hide();
    };

    
        return dialogService;
}]);
//app.module('isolateForm', []).directive('isolateForm', [function () {
//    return {
//        restrict: 'A',
//        require: '?form',
//        link: function (scope, elm, attrs, ctrl) {
//            if (!ctrl) {
//                return;
//            }

//            // Do a copy of the controller
//            var ctrlCopy = {};
//            angular.copy(ctrl, ctrlCopy);

//            // Get the parent of the form
//            var parent = elm.parent().controller('form');
//            // Remove parent link to the controller
//            parent.$removeControl(ctrl);

//            // Replace form controller with a "isolated form"
//            var isolatedFormCtrl = {
//                $setValidity: function (validationToken, isValid, control) {
//                    ctrlCopy.$setValidity(validationToken, isValid, control);
//                    parent.$setValidity(validationToken, true, ctrl);
//                },
//                $setDirty: function () {
//                    elm.removeClass('ng-pristine').addClass('ng-dirty');
//                    ctrl.$dirty = true;
//                    ctrl.$pristine = false;
//                },
//            };
//            angular.extend(ctrl, isolatedFormCtrl);
//        }
//    };
//}]);


app.directive(
    'isolateForm', [
        function () {
            'use strict';
            return {
                restrict: 'A',
                require: '?form',
                link: function link(scope, element, iAttrs, formController) {
                    element.addClass('isolated-form');

                    if (!formController) {
                        return;
                    }

                    // Remove this form from parent controller
                    var parentFormController = element.parent().controller('form');
                    if (parentFormController != undefined)
                        parentFormController.$removeControl(formController);

                    if (!parentFormController) {
                        return; // root form, no need to isolate
                    }

                    // Do a copy of the controller
                    var originalCtrl = {};
                    angular.copy(formController, originalCtrl);

                    // Replace form controller with a "null-controller"
                    var nullFormCtrl = {
                        // $addControl    : angular.noop,
                        // $removeControl : angular.noop,
                        //$setValidity: function (validationToken, isValid, control) {
                        //    originalCtrl.$setValidity(validationToken, isValid, control);
                        //    parentFormController.$setValidity(validationToken, true, formController);
                        //},
                        $setDirty: function () {
                            element.removeClass('ng-pristine').addClass('ng-dirty');
                            formController.$dirty = true;
                            formController.$pristine = false;
                        },
                        $setPristine: function () {
                            element.addClass('ng-pristine').removeClass('ng-dirty');
                            formController.$dirty = false;
                            formController.$pristine = true;
                        }
                    };

                    angular.extend(formController, nullFormCtrl);
                }
            };
        }
    ]
);
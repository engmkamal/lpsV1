app.directive('ngCkeditor', ["$rootScope", "$filter", function Directive($rootScope, $filter) {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
            var editorOptions;

            // enable ckeditor
            var ckeditor = editorConfig.InstanceByElement(element);

            // update ngModel on change
            ckeditor.ui.editor.on('change', function () {
                var data = this.getData();
                ngModel.$setViewValue(this.getData());
                if ($rootScope.customCloumns == null)
                    $rootScope.customCloumns = [];


                if (data.includes('{{textbox1}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textbox1}}")) {
                        $rootScope.customCloumns.push({
                            title: "Textbox 1",                         
                            name: "{{textbox1}}",
                            type:"text"
                        });
                    }
                }

                if (data.includes('{{textbox2}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textbox2}}")) {
                        $rootScope.customCloumns.push({
                            title: "Textbox 2",
                            name: "{{textbox2}}",
                            type: "text"
                        });
                    }
                }

                if (data.includes('{{textbox3}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textbox3}}")) {
                        $rootScope.customCloumns.push({
                            title: "Textbox 3",
                            name: "{{textbox3}}",
                            type: "text"
                        });
                    }
                }

                if (data.includes('{{textbox4}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textbox4}}")) {
                        $rootScope.customCloumns.push({
                            title: "Textbox 4",
                            name: "{{textbox4}}",
                            type: "text"
                        });
                    }
                }

                if (data.includes('{{textbox5}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textbox5}}")) {
                        $rootScope.customCloumns.push({
                            title: "Textbox 5",
                            name: "{{textbox5}}",
                            type: "text"
                        });
                    }
                }

                if (data.includes('{{textarea1}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textarea1}}")) {
                        $rootScope.customCloumns.push({
                            title: "Textarea 1",
                            name: "{{textarea1}}",
                            type: "textarea"
                        });
                    }
                }

                if (data.includes('{{textarea2}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textarea2}}")) {
                        $rootScope.customCloumns.push({
                            title: "Textarea 2",
                            name: "{{textarea2}}",
                            type: "textarea"
                        });
                    }
                }

                if (data.includes('{{textarea3}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textarea3}}")) {
                        $rootScope.customCloumns.push({
                            title: "Textarea 3",
                            name: "{{textarea3}}",
                            type: "textarea"
                        });
                    }
                }

                if (data.includes('{{textarea4}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textarea3}}")) {
                        $rootScope.customCloumns.push({
                            title: "Textarea 4",
                            name: "{{textarea4}}",
                            type: "textarea"
                        });
                    }
                }

                if (data.includes('{{textarea5}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textarea5}}")) {
                        $rootScope.customCloumns.push({
                            title: "CheckBox 5",
                            name: "{{textarea5}}",
                            type: "checkbox"
                        });
                    }
                }
                if (data.includes('{{textarea123}}')) {
                    if (validateCustomColumn($rootScope.customCloumns, "{{textarea123}}")) {
                        $rootScope.customCloumns.push({
                            title: "CheckBox 1 ",
                            name: "{{textarea123}}",
                            type: "checkbox"
                        });
                    }
                }

            });

            scope.$watch(attr.ngModel, function (value) {
                if (ngModel.$viewValue != ckeditor.getData()) {
                    ckeditor.setData(ngModel.$viewValue);
                }
            });
        }
    };

    function validateCustomColumn(customCloumns, filedName) {
        if ($filter('filter')(customCloumns, { name: filedName }, true).length > 0)
            return false
        return true;
    }
}]);


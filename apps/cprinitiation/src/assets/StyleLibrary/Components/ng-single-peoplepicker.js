var template = '<md-autocomplete flex="" ng-required="{{$mdPeoplePickerCtrl.required}}" md-input-name="{{$mdPeoplePickerCtrl.inputName}}" md-input-minlength="2"\
                    md-input-maxlength="200" md-no-cache="noCache" md-selected-item="$mdPeoplePickerCtrl.selectedItem" \
                    md-search-text="searchText" md-items="item in delayedQuerySearch(searchText)" \
                    md-item-text="item.displayName" md-require-match="" md-floating-label="{{$mdPeoplePickerCtrl.labelName}}"\
                    placeholder="{{ $mdPeoplePickerCtrl.placeholder}}">\
                    <md-item-template>\
                    <span md-highlight-text="ctrl.searchText">{{item.displayName}}</span>\
                    </md-item-template>\
                    </md-autocomplete>';

app.directive('ngSinglePeoplepicker', [function () {
    return {
        restrict: 'E',
        require: '?ngModel',
        template: template,
        link: Link,
        controller: ["$scope", "$http", "$q", "$timeout", "$mdUtil",Controller],
        controllerAs: '$mdPeoplePickerCtrl',
        bindToController: true,
        scope: {
            placeholder: '@',
            secondaryPlaceholder: '@',
            inputName: '@mdInputName',
            selectedItem: '=ngModel',
            labelName: '@mdLabel',
            required: '@mdRequired'
        }
    };

    function Link(scope, element, attrs, ctrl) {

        var readonly = attrs['readonly'];
        var limit = attrs['limit'];

        if (readonly != null) {
            scope.readonly = readonly;
        } else
            scope.readonly = false;
    }

    function Controller($scope, $http, $q, $timeout, $mdUtil) {

        var pendingSearch, cancelSearch = angular.noop;

        var cachedQuery, lastSearch;

        $scope.filterSelected = true;

        $scope.delayedQuerySearch = function (criteria) {
            if (criteria !== cachedQuery) {
                cachedQuery = criteria;
                if (!pendingSearch || !debounceSearch()) {
                    cancelSearch();

                    return pendingSearch = $q(function (resolve, reject) {
                        // Simulate async search... (after debouncing)
                        cancelSearch = reject;
                        $timeout(function () {

                            resolve(
                                $http({
                                    url: "/PeoplePicker/FindUser",
                                    method: "POST",
                                    headers: {
                                        "accept": "application/json;odata=verbose",
                                        "content-Type": "application/json;odata=verbose"
                                    },
                                    data: { query: criteria },
                                }).then(function (data) {
                                    var users = [];
                                    if (data.data != null)
                                        users = data.data;

                                    return users;
                                })
                            );

                            refreshDebounce();
                        }, Math.random() * 500, true)
                    });
                }
            }
            return pendingSearch;
        }

        function refreshDebounce() {
            lastSearch = 0;
            pendingSearch = null;
            cancelSearch = angular.noop;
        }

        function debounceSearch() {
            var now = new Date().getMilliseconds();
            lastSearch = lastSearch || now;

            return ((now - lastSearch) < 300);
        }



        $mdUtil.nextTick(function () { });
    }
}]);
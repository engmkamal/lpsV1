app.directive('ngPeoplepicker', [function () {
        return {
            require: '?ngModel',
            template: '<md-chips flex class="md-contact-chips" ng-model="contacts" md-require-match="true" md-autocomplete-snap md-on-add="consol()" md-on-remove="consol()" readonly="readonly">'
            + '<md-autocomplete md-menu-class="md-contact-chips-suggestions" md-selected-item="selectedItem" md-search-text="searchText" '
            + 'md-items="item in delayedQuerySearch(searchText)" md-no-cache="true"'
            + 'md-autoselect="true" placeholder="Select Team Member">'
            + '<div class="md-contact-suggestion">'
            + '<span class="md-contact-name">{{item.displayName}}</span>'
            + '<span class="md-contact-email">{{item.accountName}}</span>'
            + '</div>'
            + '</md-autocomplete>'
            + '<md-chip-template>'
            + '<div class="md-contact-name">'
            + '{{$chip.displayName}}'
            + '</div>'
            + '</md-chip-template>'
            + '</md-chips>',


            link: function (scope, element, attrs, ctrl) {


                var model = attrs['ngModel'];
                var readonly = attrs['readonly'];

                if (scope[model] != null) {
                    scope.contacts = scope[model];
                } else
                    scope.contacts = [];


                if (readonly != null) {
                    scope.readonly = readonly;
                } else
                    scope.readonly = false;


            }, controller: function ($scope, $http, $q, $timeout) {

                var pendingSearch, cancelSearch = angular.noop;

                var cachedQuery, lastSearch;

                $scope.filterSelected = true;

                $scope.delayedQuerySearch = function (criteria) {
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
                                        return data.data;
                                    })
                                );

                                refreshDebounce();
                            }, Math.random() * 500, true)
                        });
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
            }

        };
    }]);
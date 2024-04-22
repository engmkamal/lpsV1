var template = '<md-chips flex class="md-contact-chips"\
                    ng-model="$mdContactChipsCtrl.contacts"\
                    md-require-match="true"\
                    md-autocomplete-snap md-on-add="consol()"\
                    md-on-remove="consol()" readonly="readonly"\
                    ng-click="ItemRemove_Event()" >\
                      <md-autocomplete md-menu-class="md-contact-chips-suggestions"\
                          md-selected-item="selectedItem"\
                          md-search-text="searchText"\
                          md-items="item in delayedQuerySearch(searchText)"\
                          md-item-text="item.displayName"\
                          md-no-cache="true" md-selected-item-change="ItemChange_Event()"\
                          md-autoselect="true"\
                          placeholder="{{$mdContactChipsCtrl.contacts.length == 0 ?\
                          $mdContactChipsCtrl.placeholder : $mdContactChipsCtrl.secondaryPlaceholder}}">\
                          <div class="md-contact-suggestion">\
                              <span class="md-contact-name">{{item.displayName}}</span>\
                              <span class="md-contact-email">{{item.loginName}}</span>\
                          </div>\
                       </md-autocomplete>\
                       <md-chip-template>\
                      <div class="md-contact-name">\
                   {{$chip.displayName}}\
                  </div>\
               </md-chip-template>\
               </md-chips>';

app.directive('ngPeoplepicker', [function () {
        return {
            restrict: 'E',
            require: '?ngModel',
            template: template,
            link: Link,
            controller: Controller,
            controllerAs: '$mdContactChipsCtrl',
            bindToController: true,
            scope: {
                contactQuery: '&mdContacts',
                placeholder: '@',
                secondaryPlaceholder: '@',
                contactName: '@mdContactName',
                contacts: '=ngModel',
            }
        };

        function Link(scope, element, attrs, ctrl) {

            var readonly = attrs['readonly'];
            var limit = attrs['limit'];

            if (readonly != null) {
                scope.readonly = readonly;
            } else
                scope.readonly = false;

            scope.ItemChange_Event = function () {
                ctrl.$setValidity("limit", true);
                if (limit != null)
                    if (parseInt(limit) < scope.$mdContactChipsCtrl.contacts.length)
                        ctrl.$setValidity("limit", false);

            }

            scope.ItemRemove_Event = function () {
                ctrl.$setValidity("limit", true);
                if (limit != null)
                    if (parseInt(limit) < scope.$mdContactChipsCtrl.contacts.length)
                        ctrl.$setValidity("limit", false);
            }
        }

        function Controller($scope, $http, $q, $timeout, $mdUtil) {

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
                                    url: window.location.protocol + "//" + window.location.host + "/_layouts/15/icg.wms/Pages//WebMethods.aspx/FindUser",
                                    method: "POST",
                                    headers: {
                                        "accept": "application/json;odata=verbose",
                                        "content-Type": "application/json;odata=verbose"
                                    },
                                    data: { query: criteria },
                                }).then(function (data) {
                                    var users = [];
                                    data.data.d;

                                    angular.forEach(data.data.d, function (value) {
                                        users.push({
                                            loginName: value.loginName,
                                            displayName: value.displayName
                                        });
                                    });

                                    return users;
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
            

            $mdUtil.nextTick(function () { });
        }
    }]);
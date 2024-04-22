(app.controller("dashboardCtrl", function ($scope, $http, $timeout) {

    $scope.searchTerm = {
        cPRNo: null
    };
    $scope.requestDurationDetails = null;
    $scope.requestCount = 0;
    $scope.InProgress = 0;
    $scope.Draft = 0;
    $scope.Completed = 0;
    $scope.Rejected = 0;
    $scope.status = true;
    $scope.requestDetailsByDateList = null;
    $scope.dashboard2 = {
        toDate: new (Date),
        fromDate: new (Date)
    }
    $scope.Types = {
        Draft: 0,
        InProgress: 0,
        Rejected: 0,
        Completed: 0
    }

    //$scope.dataDurationLabels = {
    //    RequestStatus : null
    //};
    //$scope.dataDuration = {
    //    NoOfDays : null
    //};
    $scope.dataDurationLabels = [];
    $scope.dataDuration = [];
    $scope.requestDurationList = [];
    $scope.dataChart = [];
    $scope.requestDetailsByDate = [];
    $scope.authorDetails = [];
    $scope.authorNames = [];
    $scope.authorRequestCounts = [];
    $scope.colourCodeList = [];

    //Functions
    function GetAllCPRRequestDurationList() {
        try {
            $http({
                url: "/Dashboard/GetAllCPRRequestDurationList",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.requestDurationList = response.data.output;
                    //console.log($scope.requestDurationList);
                }
            }, function errorCallback(response) {
                $scope.err = response;

                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetRequestDuration: " + e);
            common.LoderHide();
        }
    }
    function GetAllRequestCount() {
        try {
            $http({
                url: "/Dashboard/GetAllRequestCount",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: {}
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.cPRCostEstimationList = response.data.output;

                    $scope.Draft = $scope.cPRCostEstimationList.Draft;
                    $scope.Completed = $scope.cPRCostEstimationList.Completed;
                    $scope.Rejected = $scope.cPRCostEstimationList.Rejected;
                    $scope.InProgress = $scope.cPRCostEstimationList.InProgress;

                    $scope.dataChart[0] = $scope.InProgress;
                    $scope.dataChart[1] = $scope.Draft;
                    $scope.dataChart[2] = $scope.Completed;
                    $scope.dataChart[3] = $scope.Rejected;

                    RunCharts();
                    GetDetailsByDateDrawChart();

                    $scope.dataDisplay = $scope.dataChart.join(",");
                    console.log($scope.InProgress + " " + $scope.Draft + " " + $scope.Completed + " " + $scope.Rejected + " " + $scope.dataChart);
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetAllRequestCount: " + e);
            common.LoderHide();
        }
    };
    function RunCharts() {
        //doughnut-chart
        new Chart(document.getElementById("pie-chart"), {
            type: 'doughnut',
            data: {
                labels: ["In Progress", "Draft", "Completed", "Reject"],
                datasets: [{
                    label: "Count",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#c45850"],
                    data: $scope.dataChart
                }]
            },
            options: {
                plugin_one_attribute: true,
                title: {
                    display: true,
                    text: 'Completed Requests percentage'
                }
            }
        });


        //line-chart
        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
                labels: ["In Progress", "Draft", "Completed", "Reject"],
                datasets: [{
                    data: $scope.dataChart,
                    label: "CPR Requests",
                    borderColor: "#3e95cd",
                    fill: false
                }
                ]
            },
            options: {
                plugin_one_attribute: false,
                title: {
                    display: true,
                    text: 'CPR Requests'
                }
            }
        });


        //Bar chart
        new Chart(document.getElementById("bar-chart"), {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'CPR Requests',
                    data: $scope.dataChart,
                    //borderColor: "#3e95cd",
                }, {
                    label: 'CPR Requests',
                    data: $scope.dataChart,
                    borderColor: "#3e95cd",

                    type: 'line'
                }],
                labels: ["In Progress", "Draft", "Completed", "Reject"]
            },
            options: {
                plugin_one_attribute: false,
                title: {
                    display: true,
                    text: 'CPR Requests'
                }
            }
        });


        //pie-chart
        new Chart(document.getElementById('myChart'), {
            type: 'pie',
            data: {
                labels: ["In Progress", "Draft", "Completed", "Reject"],
                datasets: [
                    {
                        data: $scope.dataChart,
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#3cba9f",
                            "#c45850"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#3cba9f",
                            "#c45850"
                        ]
                    }],
                options: {
                    plugin_one_attribute: false,
                    responsive: true,
                    legend: {
                        display: true
                    },
                    title: {
                        display: true,
                        text: 'Completed Requests percentage'
                    }
                }
            }
        });

        Chart.pluginService.register({
            beforeDraw: function (chart) {
                if (chart.config.options.plugin_one_attribute) {

                    var width = chart.chart.width,
                        height = chart.chart.height,
                        ctx = chart.chart.ctx;

                    ctx.restore();
                    var fontSize = (height / 114).toFixed(2);
                    ctx.font = fontSize + "em sans-serif";
                    ctx.textBaseline = "middle";

                    var cal = (($scope.Draft + $scope.Rejected + $scope.InProgress + $scope.Completed) / 100) * $scope.Completed;
                    var rounded = Math.round(cal * 10) / 10;
                    var text = rounded + "%",
                        textX = Math.round((width - ctx.measureText(text).width) / 2),
                        textY = height / 2;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }
        });


    }
    function DrawChartForDuration(duration, labels) {
        new Chart(document.getElementById("bar-chart3"), {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'CPR Requests',
                    data: $scope.dataDuration,
                    backgroundColor: ["#8e5ea2"],
                    borderColor: ["#8e5ea2"],
                }],
                labels: $scope.dataDurationLabels
            },
            options: {
                plugin_one_attribute2: false,
                title: {
                    display: true,
                    text: 'CPR Initiators'
                }
            }
        })

        ////Bar chart
        //new Chart(document.getElementById("bar-chart3"), {
        //    type: 'bar',
        //    data: {
        //        datasets: [{
        //            data: duration,
        //            borderColor: "#3e95cd",
        //        }, {
        //            data: duration,
        //            borderColor: "#3e95cd",

        //            type: 'line'
        //        }],
        //        labels: labels
        //    },
        //    options: {
        //        plugin_one_attribute: false,
        //        title: {
        //            display: true,
        //            text: 'CPR Requests'
        //        }
        //    }
        //});
    }
    function GetDetailsByDate() {
        try {
            $http({
                url: "/Dashboard/GetDetailsByDate",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { fromDate: $scope.dashboard2.fromDate, toDate: $scope.dashboard2.toDate }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.requestDetailsByDateList = response.data.output;

                    $scope.Types.Draft = $scope.requestDetailsByDateList.Draft;
                    $scope.Types.Completed = $scope.requestDetailsByDateList.Completed;
                    $scope.Types.Rejected = $scope.requestDetailsByDateList.Rejected;
                    $scope.Types.InProgress = $scope.requestDetailsByDateList.InProgress;

                    $scope.requestDetailsByDate[0] = $scope.Types.InProgress;
                    $scope.requestDetailsByDate[1] = $scope.Types.Draft;
                    $scope.requestDetailsByDate[2] = $scope.Types.Completed;
                    $scope.requestDetailsByDate[3] = $scope.Types.Rejected;


                    var test = document.getElementById("bar-chart2");
                    test = "";
                    //console.log("Get by date " + $scope.requestDetailsByDate[0] + " " + $scope.requestDetailsByDate[1] + " " + $scope.requestDetailsByDate[2] + " " + $scope.requestDetailsByDate[3]  );
                    GetDetailsByDateDrawChart();
                }
            }, function errorCallback(response) {
                $scope.err = response;

                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetDetailsByDate: " + e);
            common.LoderHide();
        }
    }
    function GetDetailsByDateDrawChart() {

        //doughnut-chart
        new Chart(document.getElementById("pie-chart2"), {
            type: 'doughnut',
            data: {
                labels: ["In Progress", "Draft", "Completed", "Reject"],
                datasets: [{
                    label: "Count",
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#c45850"],
                    data: $scope.requestDetailsByDate
                }]
            },
            options: {
                plugin_one_attribute2: true,
                title: {
                    display: true,
                    text: 'Completed Requests percentage'
                }
            }
        })

        Chart.pluginService.register({
            beforeDraw: function (chart) {
                if (chart.config.options.plugin_one_attribute2) {

                    var width = chart.chart.width,
                        height = chart.chart.height,
                        ctx = chart.chart.ctx;

                    ctx.restore();
                    var fontSize = (height / 114).toFixed(2);
                    ctx.font = fontSize + "em sans-serif";
                    ctx.textBaseline = "middle";

                    var cal = (($scope.Types.Draft + $scope.Types.Rejected + $scope.Types.InProgress + $scope.Types.Completed) / 100) * $scope.Completed;
                    var rounded = Math.round(cal * 10) / 10;
                    var text = rounded + "%",
                        textX = Math.round((width - ctx.measureText(text).width) / 2),
                        textY = height / 2;

                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }
        });
    }
    function ChartForAuthor() {
        $scope.myLineChart = document.getElementById("bar-chart2").value;
        $scope.$on("create", function (event, chart) {
            if (typeof $scope.myLineChart !== "undefined") {
                $scope.myLineChart.destroy();
            }
        })
        //Bar chart
        $scope.myLineChart = new Chart(document.getElementById("bar-chart2"), {


            type: 'bar',
            data: {
                datasets: [{
                    label: 'CPR Requests',
                    data: $scope.authorRequestCounts,
                    backgroundColor: $scope.colourCodeList,
                    borderColor: $scope.colourCodeList,
                }],
                labels: $scope.authorNames
            },
            options: {
                plugin_one_attribute2: false,
                title: {
                    display: true,
                    text: 'CPR Initiators'
                },
                events: false,
                tooltips: {
                    enabled: false
                },
                hover: {
                    animationDuration: 0
                },
                animation: {
                    duration: 1,
                    onComplete: function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        var fontSize = 2;
                        ctx.font = fontSize + "em sans-serif";
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            }
        })


    }
    function GetDetailsOfTheAuthor() {
        $scope.authorNames = [];
        $scope.authorRequestCounts = [];
        $scope.colourCodeList = [];
        $scope.authorDetails = [];
        //$timeout(function () {
        //    $scope.authorNames = $scope.authorNames;
        //    $scope.authorRequestCounts = $scope.authorRequestCounts;
        //});

        try {
            $http({
                url: "/Dashboard/GetRequestCountWithAuthor",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { fromDate: $scope.dashboard2.fromDate, toDate: $scope.dashboard2.toDate }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.authorDetails = response.data.output;

                    angular.forEach($scope.authorDetails, function (value, key) {
                        $scope.authorNames.push(value.DisplayName);
                        $scope.authorRequestCounts.push(value.Count);
                    });
                    GetRandomColor($scope.authorDetails.length);
                    ChartForAuthor();
                    //console.log($scope.authorDetails.length + " Count " );
                }
            }, function errorCallback(response) {
                $scope.err = response;
                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetDetailsOfTheAuthor: " + e);
            common.LoderHide();
        }
    }
    function GetRequestDuration(cPRNo) {
        try {
            $http({
                url: "/Dashboard/GetRequestDurationByCPRNo",
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "content-Type": "application/json;odata=verbose"
                },
                data: { cPRNo: cPRNo }
            }).then(function successCallback(response) {
                if (response.data.success) {
                    $scope.requestDurationDetails = response.data.output;

                    $scope.requestDurationDetails.StartDate = new Date($scope.requestDurationDetails.StartDate);
                    $scope.requestDurationDetails.EndDate = new Date($scope.requestDurationDetails.EndDate);
                    $scope.requestDurationDetails.CPRModified = new Date($scope.requestDurationDetails.Created);
                    $scope.requestDurationDetails.ApprovalMasterCreated = new Date($scope.requestDurationDetails.ApprovalMasterCreated);


                    if ($scope.requestDurationDetails.RequestStatus === "Completed" || $scope.requestDurationDetails.RequestStatus === "Rejected") {
                        $scope.dataDurationLabels[0] = 0;
                        $scope.dataDurationLabels[1] = Math.ceil($scope.requestDurationDetails.DraftDays);
                        $scope.dataDurationLabels[2] = Math.ceil($scope.requestDurationDetails.InProgressDays);

                        $scope.dataDuration[0] ="Draft";
                        $scope.dataDuration[1] = "In Progress";
                        $scope.dataDuration[2] = $scope.requestDurationDetails.RequestStatus;

                        console.log($scope.dataDurationLabels + " " + $scope.dataDuration);

                    }
                    else if ($scope.requestDurationDetails.RequestStatus === "In Progress")
                    {
                        $scope.dataDurationLabels[0] = 0;
                        $scope.dataDurationLabels[1] = Math.ceil($scope.requestDurationDetails.DraftDays);
                        $scope.dataDurationLabels[1] = Math.ceil($scope.requestDurationDetails.CurrentDays);

                        $scope.dataDuration[0] = "Draft";
                        $scope.dataDuration[1] = "In Progress";

                        console.log($scope.dataDurationLabels + " " + $scope.dataDuration);
                    }
                  
                    DrawChartForDuration($scope.dataDuration, $scope.dataDurationLabels);

                    console.log($scope.requestDurationDetails);
                }
            }, function errorCallback(response) {
                $scope.err = response;

                common.LoderHide();
            });

        } catch (e) {
            alert("Exception GetRequestDuration: " + e);
            common.LoderHide();
        }
    }
    function SearchByCPRNo() {
        try {
            if ($scope.searchTerm.cPRNo === "") {
                $scope.status = false
            }
            //if ($scope.status !== false || $scope.searchTerm.cPRNo !== "" || $scope.searchTerm.cPRNo !== null || $scope.searchTerm.cPRNo !== " " || $scope.searchTerm.cPRNo !== undefined)
            if ($scope.status !== false) {
                $http({
                    url: "/Dashboard/SearchRequestDurationByCPRNo",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "content-Type": "application/json;odata=verbose"
                    },
                    data: { cPRNo: $scope.searchTerm.cPRNo }
                }).then(function successCallback(response) {
                    if (response.data.success) {
                        $scope.requestDurationList = response.data.output;

                        //console.log($scope.requestDurationDetails);
                    }
                }, function errorCallback(response) {
                    $scope.err = response;

                    common.LoderHide();
                });
            }
            $scope.status = true;
        } catch (e) {
            alert("Exception SearchByCPRNo: " + e);
            common.LoderHide();
        }
    }
    function GetRandomColor() {
        $scope.i = 0;
        $scope.j = 0;
        $scope.letters = '0123456789ABCDEF'.split('');
        $scope.color = '#';
        for (j = 1; j <= $scope.authorDetails.length; j++) {
            $scope.color = "#";
            for (i = 0; i < 6; i++) {
                $scope.color += $scope.letters[Math.floor(Math.random() * 16)];
            }
            $scope.colourCodeList.push($scope.color);
        }
    }

    //Click Events
    $scope.GetDetailsByDate_ClickEvent = function () {
        try {
            GetDetailsByDate();
            GetDetailsOfTheAuthor();
        }
        catch (ex) {
            alert("Exception GetDetailsByDate_ClickEvent: " + ex);
        }
    }
    $scope.GetRequestDuration_ClickEvent = function (cPRNO) {
        try {
            GetRequestDuration(cPRNO);
        }
        catch (ex) {
            alert("Exception GetRequestDuration_ClickEvent: " + ex);
        }
    }
    $scope.SearchByCPRNo_ClickEvent = function () {
        try {
            SearchByCPRNo();
        }
        catch (ex) {
            alert("Exception SearchByCPRNo_ClickEvent: " + ex);
        }
    }
    //Page Load
    function Page_Load() {
        GetAllRequestCount();
        GetAllCPRRequestDurationList();
    }
    Page_Load();


}))     
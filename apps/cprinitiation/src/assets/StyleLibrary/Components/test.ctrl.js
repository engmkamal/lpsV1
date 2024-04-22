(app.controller("TestCtrl", function ($scope, $http, $filter) {

    $scope.test = "Angular Working";

    $scope.GetUserAccesstoken = function () {
        try {
            $http({
                url: "/Test/GetAccessToken1",
                method: "GET",
                data: {},
                headers: {
                    "accept": "application/json;odata=verbose"
                }
            }).then(function successCallback(response) {
                var data = response;
               
                $scope.UpdateFile(data.data);
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("GetUserAccesstoken "+e);
        }
    }
    $scope.UpdateFile = function (accessToken) {
        try {
            var spUrl = "https://techoneglobalorg.sharepoint.com/sites/los/";
            var filePath = document.getElementById("myFile");
            var filename = filePath.files[0].name;
            var fileSize = filePath.files[0].size;

            var fileReader = new FileReader();

            fileReader.onload = function (fileLoadedEvent) {
                data = fileLoadedEvent.target.result;
                
                $http({
                    url: spUrl + "_api/web/lists/getByTitle('Documents')/RootFolder/Files/Add(url='" + filename + "', overwrite=true)",
                    method: "POST",
                    processData: false,
                    data: data,
                    headers: {
                        "accept": "application/json;odata=verbose",
                        "binaryStringRequestBody": true,
                        "Authorization": "Bearer " + accessToken,
                        "Content-Type": undefined
                    }
                }).then(function successCallback(response) {
                    $scope.error = response;
                  
                }, function errorCallback(response) {
                    $scope.error = response;
                });          


            };

            fileReader.readAsArrayBuffer(filePath.files[0]);
        } catch (e) {
            alert("UpdateFile "+e);
        }
    }
    $scope.SendFileToServerSide = function () {
        try {
            var formdata = new FormData();
            var fileUploader = document.getElementById("myFile");
            formdata.append("test", fileUploader.files[0]);

            var request = {
                method: 'POST',
                url: "/Test/SubmitDocument",
                data: formdata,
                headers: {
                    'Content-Type': undefined
                }
            };

            $http(request).then(function successCallback(response) {
                alert(response.data);
            }, function errorCallback(response) {
                $scope.error = response;
            });
        } catch (e) {
            alert("SendFileToServerSide ",e);
        }
    }
}));
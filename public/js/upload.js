//Dropzone
Dropzone.options.frmFileUpload = {
    paramName: "file",
    maxFilesize: 2,
    uploadMultiple: false,
    acceptedFiles: '.adi,.adif,.ADI,.ADIF,',
    parallelUploads: 1,
    method: 'post',
    addRemoveLinks: true,
    init: function () {
        this.on("success", function (res) {
            window.location.href = res.xhr.responseURL;

        });
    }
};

function $(id) {
    if (this.$) {
        return new $.wrapper(id);
    }
}


$(function () {
    console.info("function ()  : Документ загужен");


});

$(document).ready(function ()
{
    console.info("Документ загужен");



    var uploadBase = "http://10.20.1.44:8899";
    var corappUploadUrl = "contractsSharing/cordapp-list";

    var uploadurl = uploadBase + corappUploadUrl
    console.log("uploadurl  :" + uploadurl)

    var auth = $("#authorization").val()


    $('#uploadBtn').on('click', function () {
       

      //  var formAction = form.attr('action');
        $.ajax({
            url: uploadBase + corappUploadUrl,
            contentType: false,
            processData: false,
            type: 'GET',
            headers: {
                'Authorization': auth
            },
            success: function (data, textStatus, jqXHR) {
                console.log("succeess: " + data);
            },
            error: function (req, status, error) {
        
                console.log(req);
            }
        }); 
    });


  




});


$(document).ready(function () {
    var uploadBase = "http://52.28.249.10:8898";
    var corappUploadUrl = "/contractsSharing/cordapp";

    var uploadurl = uploadBase + corappUploadUrl
    console.log("uploadurl  :" + uploadurl)

    $('#uploadBtn').on('click', function () {
        var cordapp = $("#fileinputcordapp")
        var cordappFile = cordapp[0].files[0]
    
        var imageItem = $("#iconInput")
        var imageFile = imageItem[0].files[0]      
        var nodesList = $("#nodesList").val()     
        var cordappName = $("#cordappName").val()
      
        var auth = $("#authorization").val()
        // The Javascript   
        var formData = new FormData();
        
        formData.append('cordappFile', cordappFile);
        formData.append('cordappIcon', imageFile);
        formData.append('nodesList', nodesList);
        formData.append('cordappName', cordappName);

    

      //  var formAction = form.attr('action');
        $.ajax({
            url: uploadBase + corappUploadUrl,        
            data: formData,          
            contentType: false,
            processData: false,
            type: 'POST',
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


    $('#testBtn').on('click', function () {
        alert('here')

        $.ajax({
            type: "GET",
            url: "http://52.28.249.10:8898/node/isBootstrapped",
            dataType: 'json',
            headers: {
                'Authorization': "SafeXain SafeXain eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaXNzIjoibWFydHlkZXYxQG1haWxpbmF0b3IuY29tIiwiZXhwIjoxNTgxNjA0Mjk4fQ.H-vDoeOkTgN18jT8K-ZG_-u5TuAG8zm-wv9phd_LGlZk-K4ISYS_kfjvhHXJ8GvcV6CzcjRDd4huBLy4tv38eg"
            },

            success: function () {
                console.log('Success ')
            },
            error: function (req, status, error) {
                alert(error);
            }
        });

    });

  
    var canvas = document.getElementById('flatten'),
    context = canvas.getContext('2d');

    make_base();

    function make_base()
    {
        base_image = new Image();
        base_image.src = 'img/image.jpg';
        base_image.onload = function(){
            context.drawImage(base_image, 0, 0);
        }
    }

    function postCanvasToURL() {
        // Convert canvas image to Base64
        var img = snap.toDataURL();
        // Convert Base64 image to binary
        var file = dataURItoBlob(img);
    }

    function dataURItoBlob(dataURI) {
        console.log('dataURItoBlob')
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }

    var snap = document.getElementById('flatten');
    var flatten = snap.getContext('2d');


    function postCanvasToURL() {
        console.log('postCanvasToURL')
        // Convert canvas image to Base64
        var img = snap.toDataURL();
        // Convert Base64 image to binary
        var file = dataURItoBlob(img);
    }

    $('#canvasUpload').on('click', function () {
        console.log('click canvas')
        // Convert canvas image to Base64
        var img = snap.toDataURL();
        // Convert Base64 image to binary
        var imageFile = dataURItoBlob(img);
   
//------------
        var cordapp = $("#fileinputcordapp")
        var cordappFile = cordapp[0].files[0]

        var imageItem = $("#iconInput")
        //var imageFile = imageItem[0].files[0]
        var nodesList = $("#nodesList").val()
        var cordappName = $("#cordappName").val()

        var auth = $("#authorization").val()
        // The Javascript   
        var formData = new FormData();

        formData.append('cordappFile', cordappFile);
        formData.append('cordappIcon', imageFile);
        formData.append('nodesList', nodesList);
        formData.append('cordappName', cordappName);


        //  var formAction = form.attr('action');
        $.ajax({
            url: uploadBase + corappUploadUrl,
            data: formData,
            contentType: false,
            processData: false,
            type: 'POST',
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


    $('#shareCordapp').on('click', function () {
        var cordapp = $("#fileinputcordapp")
        var cordappName = $("#cordappName").val()

        var cordappFile = cordapp[0].files[0]

        var imageItem = $("#iconInput")
        var imageFile = imageItem[0].files[0]


        var form = new FormData();
        form.append("cordappFile", cordappFile);
        form.append("cordappIcon", imageFile);
        form.append("nodesList", "O=Martytest12, L=Warwickshire, C=GB");
        form.append("cordappName", cordappName);


        console.log("before-----------------")
        console.log(form)

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://52.57.11.117:8898/contractsSharing/cordapp",
            "method": "POST",
            "headers": {
                "authorization": "SafeXain SafeXain eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0IiwiaXNzIjoibWFydHl0ZXN0MTNAbWFpbGluYXRvci5jb20iLCJleHAiOjE1ODIwMzQxMTR9.PGt0JMfMLlrRauubqLMoqtVoJHUxuJ936w2PSn8izHK4kn1njGavOWJijd62CKMK8ZgecRxmo_bf1-Je3ELLGQ",
        //        "cache-control": "no-cache",
        //        "postman-token": "ec5a21c9-bf7f-0fc4-7167-4db7af01f923"
            },
            "processData": false,
            "contentType": false,
          //  "mimeType": "multipart/form-data",
            "data": form
        }

        $.ajax(settings).done(function (response) {
            console.log("=====response");
            console.log(response);
        });

    });

});
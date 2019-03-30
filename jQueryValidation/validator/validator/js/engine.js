$(document).ready(function() {
						   
	$.validator.addMethod("validcb1", function(value){
		if ($("input:checked").length > 0) return true
		else return false;
	},"");
	
	$("fieldset input").click(function(){$("fieldset label.error").remove()});
	
	$("#form1").validate({
		rules: {
			yourname: {
				required: true,
				minlength: 2
				}, 
			phone: "required",
			theme: "required",
			yourmail: {
				required: true,
				email: true
			},
			checkbox3:{validcb1:true},
			msg: "required"
		},
		messages:{
			yourname:{
				required: "поле не заполнено или заполнено не верно",
				minlength: "в поле должно быть минимум 2 символа",
			},
			msg: "поле не заполнено или заполнено не верно",
			phone: "поле не заполнено или заполнено не верно",
			theme: "поле не заполнено или заполнено не верно",
			checkbox3: "отметьте один из флажков",
			yourmail: "поле не заполнено или заполнено не верно"
		},
		errorPlacement: function(error, element) {
			if (element.attr("name") == "yourname") error.insertAfter($("input[name=yourname]"));
			if (element.attr("name") == "msg") error.insertAfter($("textarea[name=msg]"));
			if (element.attr("name") == "phone") error.insertAfter($("input[name=phone]"));
			if (element.attr("name") == "theme") error.insertAfter($("input[name=theme]"));
			if (element.attr("name") == "checkbox3") error.insertAfter($("fieldset label:last"));
			if (element.attr("name") == "yourmail") error.insertAfter($("input[name=yourmail]"));
		}	
	});
})
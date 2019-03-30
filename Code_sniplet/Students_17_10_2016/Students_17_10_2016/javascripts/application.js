// после того как создастся документ будет вызвана функция startApplication

//построение combox на базе autocomlete 
(function( $ ) {
    $.widget( "custom.combobox", {
        _create: function() {
            this.wrapper = $( "<span>" )
              .addClass( "custom-combobox" )
              .insertAfter( this.element );
 
            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },
 
        _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
              value = selected.val() ? selected.text() : "";
 
            this.input = $( "<input>" )
              .appendTo( this.wrapper )
              .val( value )
              .attr( "title", "" )
              .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
              .autocomplete({
                  delay: 0,
                  minLength: 0,
                  source: $.proxy( this, "_source" )
              })
              .tooltip({
                  tooltipClass: "ui-state-highlight"
              });
 
            this._on( this.input, {
                autocompleteselect: function( event, ui ) {
                    ui.item.option.selected = true;
                    this._trigger( "select", event, {
                        item: ui.item.option
                    });
                },
 
                autocompletechange: "_removeIfInvalid"
            });
        },
 
        _createShowAllButton: function() {
            var input = this.input,
              wasOpen = false;
 
            $( "<a>" )
              .attr( "tabIndex", -1 )
              .attr( "title", "Show All Items" )
              .tooltip()
              .appendTo( this.wrapper )
              .button({
                  icons: {
                      primary: "ui-icon-triangle-1-s"
                  },
                  text: false
              })
              .removeClass( "ui-corner-all" )
              .addClass( "custom-combobox-toggle ui-corner-right" )
              .mousedown(function() {
                  wasOpen = input.autocomplete( "widget" ).is( ":visible" );
              })
              .click(function () {
                  console.log('clocks');
                  input.focus();

                  // close if already visible
                  if (input.autocomplete("widget").is(":visible")) {                  
                      input.autocomplete("close");
                      return;
                  }
                  // Close if already visible
                  if (wasOpen) {
                      console.log('was open');
                      return false ;
                  }
 
                  // Pass empty string as value to search for, displaying all results
                  input.autocomplete("search", "");
                  input.focus();               
              }
              
              );
        },
 
        _source: function (request, response)
        {

            var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");

            response(this.element.children("option").map(function () {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }) );
        },


 
        _removeIfInvalid: function( event, ui ) {
 
            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }
 
            // Search for a match (case-insensitive)
            var value = this.input.val(),
              valueLowerCase = value.toLowerCase(),
              valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });
 
            // Found a match, nothing to do
            if ( valid ) {
                return;
            }
 
            // Remove invalid value
            this.input
              .val( "" )
              .attr( "title", value + " didn't match any item" )
              .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
                this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";
        },
 
        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);

$(document).ready(startApplication);

// список фамилий студентов (для автозаполнения)
var studentNameList = getStudentsNameList();


function startApplication() {
    
    // Отображаем главный экран
    showPage('students');

    // привызка календаря (редактирование )
    $('#dateExamEdit').datepicker();
    $('#dateExamEdit').datepicker("option", $.datepicker.regional["ru-Ru"]);
    // выбирать значения из выпадающего каледаря
    $("#dateExamEdit").prop("readonly", true);
    $('input[type=date]').datepicker({ dateFormat: 'dd-mm-yyyy' });

    // привызка календаря (дабавление )
    // привязка по id 
    $("#exam_date_create").datepicker();
    $("#exam_date_create").prop("readonly", true);
    $('#exam_date_create').datepicker("option", $.datepicker.regional["ru-Ru"]);

    // автозаполнение - учебные  предмет
    // привязка по классу 
    $(".subject_change").autocomplete({
        minLength: 0,
        // источник данных
        // используем данным образом чтобы автозаполнение вызывалось на мадольной форме 
        source: function (request, response) {
            // delegate back to autocomplete, but extract the last term
            response($.ui.autocomplete.filter(
              subjectsArray, (request.term)));
        }
    });

  
  
    // автозаполнение  фамилия 
    $(".last_name").autocomplete({
        minLength: 0,
        source: function (request, response) {
            // delegate back to autocomplete, but extract the last term
            response($.ui.autocomplete.filter(
              studentNameList, (request.term)));
        }
    });
    $("#page-edit-student").dialog({ autoOpen: false });
	

    // отображение модального окна на редактирование 	
	$("#create-student").on("click", function() {
				$("#page-edit-student").dialog("open");
			});

	
	 
	   
    // бегунок - для установки оценки 
    $(".slider-rating").slider({
        min: 0,
        max: ratingList.length - 1,
        value: 0,
        slide: function (event, ui) {
            $(".slider-rating-value").val(ratingList[ui.value]);
        }
    });
    // оценка неректируема - заполняем слайдером 
    $(".slider-rating-value").prop("readonly", true);

    //выпадающий список 
    Bindcombobox();
    $(".combobox").combobox();
    

}

function Bindcombobox ()
{
      var select = document.getElementById('subjectEdit');

      for (var i = 0; i < subjectsArray.length; i++) {
        var opt = document.createElement('option');
        opt.value = subjectsArray[i];
        opt.innerHTML = subjectsArray[i];
        select.appendChild(opt);
    }

    var select = document.getElementById('subject_name_add');

    for (var i = 0; i < subjectsArray.length; i++) {
        var opt = document.createElement('option');
        opt.value = subjectsArray[i];
        opt.innerHTML = subjectsArray[i];
        select.appendChild(opt);
    }
}

// скрываем все div 
function hideAllPages() {
    // делаем неактивными 
    $('.navbar li').removeClass('active');
    // скрываем 
    $('.page').hide();
}

// отображение области (div )
function showPage(pageName) {

    // Скрываем все страницы
    hideAllPages();

    // Отображаем заказанную страницу
    // отображаем с задержкой 
    $('#page-' + pageName).fadeIn(500);
    // путем установки свойства 
    $('#link-page-' + pageName).addClass('active');

    drawStudents();
}

// проверка заполнения полей при создании нового студента 
function checkStudentForm(form) {
    // спрятать ошибки 
    hideFormError(form);

    // добавляемый студент 
    var student = {
        // получаем поля из елементов управления 
        lastName: form.elements.last_name_add.value,
        subject: form.elements.subject_name_add.value,
        date: form.elements.exam_date_create.value,
        rate: form.elements.rate_add.value
    }

    var result = true;

    // незаполнена фамилия 
    if (student.lastName.length <= 0) {
        // отобразить сообщение об ошибке 
        showFormError(form, 'Введите фамилию')
        result = false
    }

    // не заполнено поле 
    if (student.subject.length <= 0) {
        showFormError(form, 'Введите предмет')
        result = false
    }

    // нет оценки 
    if ((student.rate.toString().length <= 0)) {
        showFormError(form, 'Введите оценку ')
        result = false
    }
        // некорректная оценка 
        // при отключении jquery поскольку поле редактируемо
    else if ((ratingList.indexOf(student.rate) < 0)) {
        showFormError(form, 'Некорректное значение оценки')
        result = false
    }

    // проверка даты 
    if (!isValidDate(student.date)) {
        showFormError(form, 'Некоррекный формат даты');
        result = false
    }
    return result
}

// проверка даты на корректность
function isValidDate(value, userFormat) {

    // Используем формат по умолчанию, если ничего не указано
    userFormat = userFormat || 'mm/dd/yyyy';

    // Находим разделитель исключая символы месяца, дня и года (в английском варианте - m, d, y)
    var delimiter = /[^mdy]/.exec(userFormat)[0];

    // Создаем массив из месяца, дня и года,
    // то есть мы знаем порядок формата
    var theFormat = userFormat.split(delimiter);

    // Создаем массив из даты пользователя
    var theDate = value.split(delimiter);

    function isDate(date, format) {
        var m, d, y, i = 0, len = format.length, f;
        // перебираем массив значений даты как строки 
        for (i; i < len; i++) {
            f = format[i];
            if (/m/.test(f)) m = date[i];
            if (/d/.test(f)) d = date[i];
            if (/y/.test(f)) y = date[i];
        }
        return (
          m > 0 && m < 13 &&
          y && y.length === 4 &&
          d > 0 &&
          // Проверяем правильность дня месяца
          d <= (new Date(y, m, 0)).getDate()
        );
    }

    return isDate(theDate, theFormat);
}


//убрать дубликаты
function ArrNoDupe(a) {
    var temp = {};
    for (var i = 0; i < a.length; i++)
        temp[a[i]] = true;
    var r = [];
    // перебираем елементы 
    for (var k in temp)
        r.push(k);
    return r;
}

//получить список всех фамилий 
function getStudentsNameList() {
    var list = [];

    // перебираем все фамилии
    for (var j = 0; j < people.length; j++) {
        list.push(people[j].lastName);
    }

    // убрать дубликаты
    list = ArrNoDupe(list);
   
    return list;
}

// перестроить список фамилий 
function studentslastNameList() {
    var list = [];

    for (var j = 0; j < people.length; j++) {
        list.push(people[j].lastName);
    }

    list = ArrNoDupe(list);

    studentNameList = list;   
}

function drawStudents() {

    var myHTML = '';

    //фамилия, предмет, дата, оценка, иконка редактирования записи.
    var template = "<tr id='student-#id#'><td>#lastName#</td><td>#subject#</td><td>#date#</td><td>#rate#</td><td onclick='showEditStudent(this.parentNode, event)'><a class='glyphicon glyphicon-pencil' aria-hidden='true'></a></td></tr>";

    var temporaryString = '';

    // для каждого елемента списка  
    for (var i = 0; i < people.length; i++) {
        // сформаировать строку таблицы
        temporaryString = template;

        temporaryString = temporaryString.replace('#id#', people[i]._id);
        temporaryString = temporaryString.replace('#lastName#', people[i].lastName);
        temporaryString = temporaryString.replace('#subject#', people[i].subject);
        temporaryString = temporaryString.replace('#date#', people[i].date);
        temporaryString = temporaryString.replace('#rate#', (people[i].rate));
        myHTML = myHTML + temporaryString;
    }

    // переделать данные в таблице 
    $('#students-list tbody').html(myHTML);
}


// добавление нового студента
function addStudent(myForm, event) {
    event.preventDefault();

    // данные из елеметова управления 
    var newStudent = {
        "_id": people.length + 1,
        "lastName": myForm.elements.last_name_add.value,
        "subject": myForm.elements.subject_name_add.value,
        "date": myForm.elements.exam_date_create.value,
        "rate": myForm.elements.rate_add.value
    }

    var exist = false;
    // проверка корректности введенных данных
    if (checkStudentForm(myForm)) {

        //проверка: есть ли в ведомости связка студент-предмент
        for (var j = 0; j < people.length; j++) {
            if (newStudent.subject == people[j].subject &&
                newStudent.lastName == people[j].lastName) {
                // старая запись перезаписыватся новой записью
                //people[j] = newStudent;              
                people[j].rate = newStudent.rate;
                people[j].subject = newStudent.subject;
                people[j].date = newStudent.date;

                exist = true;
            }
        }
        // если запись не найдена 
        if (!exist) {
            // добавить в список студентов 
            people.push(newStudent);
        }

        // закрыть диалог
        $("#page-add-student").dialog("close");


        // очистить елементы управления 
        clearAddFormInput();
        // перестоить список текущих фамилий 
        studentslastNameList();
        // перестроить таблицу 
        drawStudents();
    }
}

// очистка елементов управления в окне добавления 
function clearAddFormInput() {
    $('#add-student-form input[name=last_name_add]').val('');
    $('#add-student-form input[name=subject_name_add]').val('');
    $('#add-student-form input[name=rate_add]').val('');
}
// очистка елементов управления в окне редактирования 
function claerEditFormsInputsElements() {
    $('#edit-student-form input[name=lastNameEdit]').val('');
    $('#edit-student-form input[name=subjectEdit]').val('');
    $('#edit-student-form input[name=rateEdit]').val('');
}

// отобразить окно редактирования студента 
function showEditStudent(studentRow, event) {
    event.preventDefault();
    // редактиремая строка 
    var row = $(studentRow);

    // получить данные из таблицы 
    var id = row.prop('id').replace("student-", "");
    var lastName = row.find('td')[0].textContent;
    var subjectItem = row.find('td')[1].textContent;
    var examDateItem = row.find('td')[2].textContent;
    var reateItem = row.find('td')[3].textContent;

    //заполнить соответствующие елементы управления  
    // согласно атрибуту name 
    $('#edit-student-form input[name=id]').val(id);
    $('#edit-student-form input[name=lastNameEdit]').val(lastName);
    $('#edit-student-form input[name=subjectEdit]').val(subjectItem);
    $('#edit-student-form input[name=dateExamEdit]').val(examDateItem);
   // $('#edit-student-form input[name=rateEdit]').val(reateItem); 

    // отобразить диалог
    $("#page-edit-student").dialog();
}
// редактирование студента 
function editStudent(myForm, event) {
    event.preventDefault();

    // редактируемый объект согласно елементов формы 
    var editStudent = {
        "_id": myForm.elements.id.value,
        "lastName": myForm.elements.lastNameEdit.value,
        "subject": myForm.elements.subjectEdit.value,
        "date": myForm.elements.dateExamEdit.value,
        "rate": myForm.elements.rateEdit.value
    }

    // проверка входных данных
    if (checkStudentFormEdit(myForm)) {
        // есликорректно 
        for (var i = 0; i < people.length; i++) {
            //нашли редактируемого 
            if (editStudent._id == people[i]._id) {
                // заменили новыми данными 
                people[i] = editStudent;
            }
        }

        for (var j = 0; j < people.length; j++) {
            //если в списке уже есть связка студент-предмет и это не текущая редактируемая связка        
            if (editStudent.subject == people[j].subject &&
                editStudent.rate == people[j].rate &&
                editStudent._id != people[j]._id) {
                // старая запись перезаписыватся новой записью
                people[i].rate = editStudent.rate;
                people[i].subject = editStudent.subject;
                people[i].date = editStudent.date;              
            }
        }

        // очистить елементы ввода 
        claerEditFormsInputsElements();
        // закрыть диалог 
        $("#page-edit-student").dialog("close");
        // отобразить таблицу 
        showPage('students');
    }
}

// валидация данных при редактировании студента
function checkStudentFormEdit(form) {
    hideFormError(form);

    var student = {
        "_id": form.elements.id.value,
        "lastName": form.elements.lastNameEdit.value,
        "subject": form.elements.subjectEdit.value,
        "date": form.elements.dateExamEdit.value,
        "rate": form.elements.rateEdit.value
    }
    var result = true;

    if (student.lastName.length <= 0) {
        showFormError(form, 'Введите фамилию')
        result = false
    }

    if (student.subject.length <= 0) {
        showFormError(form, 'Введите предмет')
        result = false
    }

    if ((student.rate.toString().length <= 0)) {
        showFormError(form, 'Введите оценку ')
        result = false
    }
    else if ((ratingList.indexOf(student.rate) < 0)) {
        showFormError(form, 'Некорректное значение оценки')
        result = false
    }

    if (!isValidDate(student.date)) {
        showFormError(form, 'Некоррекный формат даты');
        result = false
    }
    return result
}

// отобразить ошибки обнаруженые при валидации
function showFormError(form, message) {
    var alert = form.parentNode.getElementsByClassName('alert')[0];

    //console.error([alert, message])
    alert.innerHTML = alert.innerHTML.toString() + "<div>" + message + "</div>";
    alert.className = alert.className.replace("hidden", "");
}

// скрываем форму (div) с ошибками 
function hideFormError(form) {
    // найти нужный елемент  по классу 
    var alert = form.parentNode.getElementsByClassName('alert')[0];
    //очистить содержимое 
    alert.innerHTML = "";
    // дабавлея свойство "скрыт" для елемента управления (разметки )
    if (alert.className.indexOf("hidden") == -1) {
        alert.className = alert.className + " hidden";
    }
}

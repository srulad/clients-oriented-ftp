var error_count = 0;
var error_count_options = 0;

$(document).ready(function() {
	$('input:first').focus();
});

function clean_form(this_form) {
	$(this_form).find(':input').each(function() {
		if($(this).hasClass('field_error')) {
			$(this).removeClass('field_error');
		}
	});
	$(this_form).find('.field_error_msg').each(function() {
		$(this).remove();
	});
}


function is_complete_all_options(this_form,error) {
	var error_count_options = 0;
	$(this_form).find(':input:not(.empty)').each(function() {
		if ($(this).hasClass('textboxlist-bit-editable-input')) {
			// Exclude every Textboxlist generated input
		}
		else {
			if ($(this).val().length == 0) {
				$(this).addClass('field_error');
				error_count_options++;
			}
		}
	});
	if(error_count_options > 0) {
		error_count++;
	}
}

function add_error_to_field(field, error) {
	error_count++;
	$(field).addClass('field_error');
	var this_field_name = $(field).attr('name');
	this_field_msg_name = this_field_name.replace(/\[/g,'_');
	this_field_msg_name = this_field_msg_name.replace(/\]/g,'_');
	if ($('#error_for_'+this_field_name).length == 0) {
		$(field).after('<div class="field_error_msg" id="error_for_'+this_field_msg_name+'"><ul></ul></div>');
	}
	$('#error_for_'+this_field_msg_name+' ul').append('<li>'+error+'</li>');
}

function is_complete(field,error) {
	if ($(field).val().length == 0) {
		add_error_to_field(field, error);
	}
}

function is_selected(field,error) {
	if ($(field).val() == 'ps_empty_value') {
		add_error_to_field(field, error);
	}
}

function is_length(field,minsize,maxsize,error) {
	if ($(field).val().length < minsize || $(field).val().length > maxsize) {
		add_error_to_field(field, error);
	}
}

function is_email(field,error) {
	var reg = /^([^@])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var address = field.value;
	if (reg.test(address) == false) {
		add_error_to_field(field, error);
	}
}


function is_alpha(field,error) {
	var checkme = field.value;
	if (!(checkme.match(/^[a-zA-Z0-9]+$/))) {
		add_error_to_field(field, error);
	}
}

function is_password(field,error) {
	var checkme = field.value;
	if (!(checkme.match(/^[0-9a-zA-Z`!"?$%\^&*()_\-+={\[}\]:;@~#|<,>.'\/\\]+$/))) {
		add_error_to_field(field, error);
	}
}

function is_match(field,field2,error) {
	if ($(field).val() != $(field2).val()) {
		add_error_to_field(field, error);
		add_error_to_field(field2, error);
	}
}

function show_form_errors() {
	if (error_count > 0) {
		error_count = 0;
		return false;
	}
}

/**
 * Adapted from http://jsfiddle.net/Ngtp7/2/
 */
$(function () {
  $(".password_toggle").each(function (index, input) {
    var $input = $(input);
    $(".password_toggler").click(function () {
      var change = "";
	  var icon = $(this).find('i');
      if ($(this).hasClass('pass_toggler_show')) {
        $(this).removeClass('pass_toggler_show');
        $(this).addClass('pass_toggler_hide');
        $(icon).removeClass('icon-eye-open');
        $(icon).addClass('icon-eye-close');
        change = "text";
      } else {
        $(this).removeClass('pass_toggler_hide');
        $(this).addClass('pass_toggler_show');
        $(icon).removeClass('icon-eye-close');
        $(icon).addClass('icon-eye-open');
        change = "password";
      }
      var rep = $("<input type='" + change + "' />")
        .attr("id", $input.attr("id"))
        .attr("name", $input.attr("name"))
        .attr('class', $input.attr('class'))
        .attr('maxlength', $input.attr('maxlength'))
        .val($input.val())
        .insertBefore($input);
      $input.remove();
      $input = rep;
    }).insertBefore($input);
  });
  return false;
});
//======================================================
//Timer
//Author:Shawn Shao
//Last Update:6/28/2013
//Decription: Target to open website by time settings.
//======================================================
// Save this script as `options.js`
//typeahead lib
var hour_list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
var min_list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'];

//draw option section according to localHost
var drawOptionSection = function() {
	var objCurrent = localStorage.getItem("Timer");
	if (!objCurrent) {
		localStorage["Timer"] = "[]";
		objCurrent = JSON.parse(localStorage.getItem("Timer"));
	} else {
		objCurrent = JSON.parse(localStorage.getItem("Timer"));
	}
	var divContent = document.createElement("table");
	divContent.id = "divContent";
	divContent.className = 'table table-hover';
	var divFooter = document.createElement("div");
	divFooter.id = "divFooter";
	//Initialize add button
	var addButton = document.createElement("a");
	addButton.innerHTML = "Add";
	addButton.id = "addBtn";
	addButton.className = 'btn btn-small btn-success';
	addButton.setAttribute("role", "button");
	addButton.setAttribute("data-toggle", "modal");
	addButton.href = "#addModal"
	if (objCurrent) {
		var iCurrentLength = objCurrent.length;
		for (var i = 0; i < iCurrentLength; i++) {
			var divSubContent = document.createElement("tr");
			var editButton = document.createElement("a");
			editButton.innerText = "Edit";
			editButton.href = "#editModal";
			editButton.setAttribute("data-toggle", "modal");
			var delButton = document.createElement("button");
			delButton.innerText = "Delete";

			//input content and bind edit/del button to specified record.
			divSubContent.innerHTML = "<td>Timer" + (i + 1) + "</td> <td>Status: " + objCurrent[i].switch_status + "; </td><td>Time: " + objCurrent[i].hour + " : " + objCurrent[i].minute + "</td><td>Comments: " + objCurrent[i].comments + "</td><td>Site: " + objCurrent[i].site + "</td>";
			editButton.className = "editBtn btn btn-mini btn-info";
			editButton.id = "editBtn" + i;
			delButton.className = "delBtn btn btn-mini btn-danger";
			delButton.id = "delBtn" + i;

			divContent.appendChild(divSubContent);
			divContent.appendChild(editButton);
			divContent.appendChild(delButton);
		}
	} else {
		divContent.innerHTML = "There's no rules right now.";
	}

	divFooter.appendChild(addButton);
	document.body.appendChild(divFooter);
	document.body.appendChild(divContent);

	var delBtnCount = document.getElementsByClassName("delBtn").length;
	var editBtnCount = document.getElementsByClassName("editBtn").length;

	for (var i = 0; i < delBtnCount; i++) {
		document.querySelector('#delBtn' + i).addEventListener('click', function() {
			delRecord();
		});
		document.querySelector('#editBtn' + i).addEventListener('click', function() {
			loadData();
		});
	}
}
// Restores select box state to saved value from localStorage.
function restore_options() {
	var objContent = document.getElementById("divContent");

	if (objContent == "") {//blank list of localStorage
		document.getElementById("divContent").remove();
		document.getElementById("divFooter").remove();
		drawOptionSection();

	} else if (!objContent) {//no content was created yet, first run
		drawOptionSection();

	} else if (objContent) {//list not blank and content not blank, need update
		document.getElementById("divContent").remove();
		document.getElementById("divFooter").remove();
		drawOptionSection();
	}
}

var saveAddRecord = function() {
	var status, hour, minute, site, comments;
	status = $("#switchStatus_add").val();
	hour = $("#hour_add").val();
	minute = $("#minute_add").val();
	site = $("#site_add").val();
	comments = $("#comments_add").val();
	var localTimeExist = localStorage.getItem("Timer");
	if (localTimeExist && (localTimeExist != "[]")) {
		var objTimer = {
			//"timer_id" : "Timer" + iCurrentLength,
			"switch_status" : status,
			"hour" : hour,
			"minute" : minute,
			"site" : site,
			"comments" : comments
		};
		var newTimer = localTimeExist.replace("]", "," + JSON.stringify(objTimer) + "]");
		localStorage.setItem('Timer', newTimer);
	} else {
		var objTimer = {
			//"timer_id" : "Timer" + iCurrentLength,
			"switch_status" : status,
			"hour" : hour,
			"minute" : minute,
			"site" : site,
			"comments" : comments
		};
		localStorage.setItem('Timer', "[" + JSON.stringify(objTimer) + "]");
	}
	restore_options();
	$("#closeAddDialog").click();
	//clear cache
	$(".switchStatus_add .btn").each(function() {
		if (this.innerHTML.trim() == $("#switchStatus_add").val())
			this.className = "btn";
	})
	$("#switchStatus_add").val("");
	$("#hour_add").val("");
	$("#minute_add").val("");
	$("#site_add").val("");
	$("#comments_add").val("");
	location.reload();
}
var saveEditRecord = function(t_id) {
	var objTimer = {
		"switch_status" : $("#switchStatus_edit").val(),
		"hour" : $("#hour_edit").val(),
		"minute" : $("#minute_edit").val(),
		"site" : $("#site_edit").val(),
		"comments" : $("#comments_edit").val()
	}
	var objCurrentRecs = JSON.parse(localStorage.getItem("Timer"));
	var iCurrentLength = objCurrentRecs.length;
	for ( i = 0; i < iCurrentLength; i++) {
		if (i == t_id) {
			objCurrentRecs.splice(i, 1, objTimer);
			localStorage["Timer"] = JSON.stringify(objCurrentRecs);
			break;
		}
	}
	restore_options();
	$("#closeEditDialog").click();
	location.reload();
}
var delRecord = function() {
	var btn_id = event.toElement.id;
	var reg_del = /\d+/;
	var t_id = reg_del.exec(btn_id).toString();

	var objCurrentRecs = JSON.parse(localStorage.getItem("Timer"));
	var iCurrentLength = objCurrentRecs.length;
	for ( i = 0; i < iCurrentLength; i++) {
		if (i == t_id) {
			objCurrentRecs.splice(i, 1);
		}
	}
	localStorage["Timer"] = JSON.stringify(objCurrentRecs);
	restore_options();
}
var loadData = function() {
	var btn_id = event.toElement.id;
	var reg_del = /\d+/;
	var t_id = reg_del.exec(btn_id).toString();

	var objCurrentRecs = JSON.parse(localStorage.getItem("Timer"));
	var iCurrentLength = objCurrentRecs.length;
	//clear the cache
	$(".switchStatus_edit .btn").each(function() {
		if (this.innerHTML.trim() == $("#switchStatus_edit").val())
			this.className = "btn";
	})
	for ( i = 0; i < iCurrentLength; i++) {
		if (i == t_id) {
			$("#switchStatus_edit").val(objCurrentRecs[i].switch_status);
			$(".switchStatus_edit .btn").each(function() {
				if (this.innerHTML.trim() == $("#switchStatus_edit").val())
					this.className = "btn active";
			})
			$("#hour_edit").val(objCurrentRecs[i].hour);
			$("#minute_edit").val(objCurrentRecs[i].minute);
			$("#site_edit").val(objCurrentRecs[i].site);
			$("#comments_edit").val(objCurrentRecs[i].comments);
			document.querySelector('#saveEdit').addEventListener('click', function() {
				saveEditRecord(t_id);
			})
			break;
		}
	}
}

document.addEventListener('DOMContentLoaded', function() {
	restore_options();
	document.body.setAttribute("style", "width: 800;height: 500;")
	$(".switchStatus_add .btn").click(function() {
		// whenever a button is clicked, set the hidden helper
		$("#switchStatus_add").val($(this).text().trim());
	});
	$(".switchStatus_edit .btn").click(function() {
		// whenever a button is clicked, set the hidden helper
		$("#switchStatus_edit").val($(this).text().trim());
	});
	document.querySelector('#saveAdd').addEventListener('click', function() {
		saveAddRecord();
	})
	//add typeahead
	$('#hour_edit').typeahead({
		source : hour_list
	});
	$('#hour_add').typeahead({
		source : hour_list
	});
	$('#minute_edit').typeahead({
		source : min_list
	});
	$('#minute_add').typeahead({
		source : min_list
	});
	//add tooltips
	$("#add_status_btn_on").tooltip({
		title : 'Invoke both site and notification.'
	})
	$("#add_status_btn_off").tooltip({
		title : 'Nothing would be triggered.'
	})
	$("#add_status_btn_notification").tooltip({
		title : 'Only trigger notification.'
	})
	$("#edit_status_btn_on").tooltip({
		title : 'Invoke both site and notification.'
	})
	$("#edit_status_btn_off").tooltip({
		title : 'Nothing would be triggered.'
	})
	$("#edit_status_btn_notification").tooltip({
		title : 'Only trigger notification.'
	})
});


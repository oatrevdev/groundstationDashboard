
	

	function refresh() {
		
		var apiUrl = 'https://u72zjy1ugd.execute-api.us-west-2.amazonaws.com/default/maxarContacts';
		fetch(apiUrl).then(response => {
		  return response.json();
		}).then(data => {
		  // Work with JSON data here
		  var arrItems = [];
		  console.log(typeof data)
		  arrItems = data; 	// Populate array with JSON data.
		  console.log(arrItems);
			var div = document.getElementById('contacts');     // The parent <div>.
			div.innerHTML = '';
				
			console.log("Before the loop")
			var input = document.createElement("INPUT");
			input.setAttribute('type','text')
			input.setAttribute('id','myInput')
			input.setAttribute('onkeyup','searchContacts()')
			input.setAttribute('placeholder','Search')
			div.appendChild(input)
			//Create a HTML Table element.
			var table = document.createElement("TABLE");
			table.border = "1";

			table.setAttribute('class','searchable sortable')
			table.setAttribute('id','ContactTable')
			//Get the count of columns.
			var columnCount = 8;
			var row = table.insertRow(-1);
			var headerCellContact = document.createElement("TH");
			headerCellContact.innerHTML = "ContactID";
			headerCellContact.setAttribute('onclick','sortTable(0)');
			headerCellContact.onclick = function(){sortTable(0)};
        	row.appendChild(headerCellContact);
			var headerCellSpacecraft = document.createElement("TH");
			headerCellSpacecraft.innerHTML = "Spacecraft";
			headerCellSpacecraft.setAttribute('onclick','sortTable(1)');
        	row.appendChild(headerCellSpacecraft);
			var headerCellNoradID = document.createElement("TH");
			headerCellNoradID.innerHTML = "NoradID";
			headerCellNoradID.setAttribute('onclick','sortTable(2)');
        	row.appendChild(headerCellNoradID);
			var headerCellMP = document.createElement("TH");
			headerCellMP.innerHTML = "Mission Profile";
			headerCellMP.setAttribute('onclick','sortTable(3)');
        	row.appendChild(headerCellMP);
			var headerCellGroundstation = document.createElement("TH");
			headerCellGroundstation.innerHTML = "Groundstation";
			headerCellGroundstation.setAttribute('onclick','sortTable(4)');
        	row.appendChild(headerCellGroundstation);
			var headerCellStartTime = document.createElement("TH");
			headerCellStartTime.innerHTML = "StartTime";
			headerCellStartTime.setAttribute('onclick','sortTable(5)');
        	row.appendChild(headerCellStartTime);
			var headerCellEndTime = document.createElement("TH");
			headerCellEndTime.innerHTML = "EndTime";
			headerCellEndTime.setAttribute('onclick','sortTable(6)');
        	row.appendChild(headerCellEndTime);
			var headerCellStatus = document.createElement("TH");
			headerCellStatus.innerHTML = "Status";
			headerCellStatus.setAttribute('onclick','sortTable(7)');
        	row.appendChild(headerCellStatus);
        	
			// Loop through data in the JSON array.
			for (i = 0; i <= arrItems.length - 1; i++) {
				row = table.insertRow(-1);


				// Create <div elements or table elements.
				//var divContactID = document.createElement('div');
				var cellContactID = row.insertCell(-1);
                cellContactID.innerHTML = arrItems[i].contactId;
				//divContactID.innerHTML = arrItems[i].contactId;

				//var divspacecraft = document.createElement('div');
				var cellspacecraft = row.insertCell(-1);
                cellspacecraft.innerHTML = arrItems[i].spacecraft;
				//divspacecraft.innerHTML = arrItems[i].spacecraft;

				//var divnoradID = document.createElement('div');
				var cellnoradID = row.insertCell(-1);
                cellnoradID.innerHTML = arrItems[i].noradSatelliteID;
				//divnoradID.innerHTML = arrItems[i].noradSatelliteID;

				//var divMPName = document.createElement('div');
				var cellMPName = row.insertCell(-1);
                cellMPName.innerHTML = arrItems[i].missionProfileName;
				//divMPName.innerHTML = arrItems[i].missionProfileName;

				//var divGroundstation = document.createElement('div');
				var cellGroundstation = row.insertCell(-1);
                cellGroundstation.innerHTML = arrItems[i].groundStation;
				//divGroundstation.innerHTML = arrItems[i].groundStation;

				//var divstartTime = document.createElement('div');
				var cellstartTime = row.insertCell(-1);
                cellstartTime.innerHTML = arrItems[i].startTime;
				//divstartTime.innerHTML = arrItems[i].startTime;

				//var divendTime = document.createElement('div');
				var cellendTime = row.insertCell(-1);
                cellendTime.innerHTML = arrItems[i].endTime;
				//divendTime.innerHTML = arrItems[i].endTime;

				//var divStatus = document.createElement('div');
				var cellStatus = row.insertCell(-1);
                cellStatus.innerHTML = arrItems[i].contactStatus;
				//divStatus.innerHTML = arrItems[i].contactStatus;
				
				// Add the child DIVs to parent DIV.
				//div.appendChild(divContactID);
				//div.appendChild(divspacecraft);
				//div.appendChild(divnoradID);
				//div.appendChild(divMPName);
				//div.appendChild(divGroundstation);
				//div.appendChild(divstartTime);
				//div.appendChild(divendTime);
				//div.appendChild(divStatus);
			}
		  div.appendChild(table); 	
		  console.log(data);
		}).catch(err => {
		  // Do something for an error here
		  console.log(err);
		});
	
	}

	function sortTable(n) {
		var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
		table = document.getElementById("ContactTable");
		switching = true;
		// Set the sorting direction to ascending:
		dir = "asc";
		/* Make a loop that will continue until
		no switching has been done: */
		while (switching) {
		  // Start by saying: no switching is done:
		  switching = false;
		  rows = table.rows;
		  /* Loop through all table rows (except the
		  first, which contains table headers): */
		  for (i = 1; i < (rows.length - 1); i++) {
			// Start by saying there should be no switching:
			shouldSwitch = false;
			/* Get the two elements you want to compare,
			one from current row and one from the next: */
			x = rows[i].getElementsByTagName("TD")[n];
			y = rows[i + 1].getElementsByTagName("TD")[n];
			/* Check if the two rows should switch place,
			based on the direction, asc or desc: */
			if (dir == "asc") {
			  if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			} else if (dir == "desc") {
			  if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			  }
			}
		  }
		  if (shouldSwitch) {
			/* If a switch has been marked, make the switch
			and mark that a switch has been done: */
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			// Each time a switch is done, increase this count by 1:
			switchcount ++;
		  } else {
			/* If no switching has been done AND the direction is "asc",
			set the direction to "desc" and run the while loop again. */
			if (switchcount == 0 && dir == "asc") {
			  dir = "desc";
			  switching = true;
			}
		  }
		}
	  }

	  function searchContacts() {
		// Declare variables
		var input, filter, table, tr, td, i, txtValue;
		input = document.getElementById("myInput");
		filter = input.value.toUpperCase();
		table = document.getElementById("ContactTable");
		tr = table.getElementsByTagName("tr");
	  
		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
		  td = tr[i].getElementsByTagName("td")[0];
		  if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
			  tr[i].style.display = "";
			} else {
			  tr[i].style.display = "none";
			}
		  }
		}
	  }
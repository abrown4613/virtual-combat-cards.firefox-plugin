//$Id$
/**
 * Copyright (C) 2008-2009 tms - Thomas Santana <tms@exnebula.org>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 */
 
function dndiGetHTTPRequest() {
   try { return new XMLHttpRequest(); } catch(e) {}
   try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
   try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
   alert("XMLHttpRequest not supported");
   return null;
}

function dndiHome(event) {
   var url="http://ww2.wizards.com/dnd/insider/database.aspx"
   window._content.document.location  = url
}

function dndiDoCapture(url) { 
  var data=window.content.document.getElementById("detail")
  if(data==null) {
    alert("The page does not seem to contain and capturable data, must be a D&D Insider result page.")
	return 0;
  }
  var xmlHttp=dndiGetHTTPRequest();

  var serializer = new XMLSerializer();
  data=serializer.serializeToString(window.content.document.getElementById("detail"));

  xmlHttp.onreadystatechange  = function()
    { 
         if(xmlHttp.readyState  == 4)
         {
              if(xmlHttp.status  == 200) 
                  alert(xmlHttp.responseText) 
              else 
                 alert("Sending to "+url+" failed with error code: " + xmlHttp.status);
         }
    }; 


  // Open a connection to the server
  xmlHttp.open("POST", url,true);

  // Tell the server you're sending it XML
  xmlHttp.setRequestHeader("Content-Type", "text/xml");
  xmlHttp.setRequestHeader("Connection", "close");

  // Send the request
  xmlHttp.send(data);
  //xmlHttp.channel.cancel(true);
}


function dndiCapture(event) {
	var url = document.getElementById("dndiVccUrl").value;
	if(url==null || url =="") {
		alert("You must specify the Remote URL parameter.");
	} else { 
		dndiDoCapture(url);
    }
}
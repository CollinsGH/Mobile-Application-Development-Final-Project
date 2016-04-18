/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// $(document).delegate("#table_section", "pageinit", function(){
  $(document).ready(function(){
    $tbl = $('#tblCalendar'); // declares table
        $.getJSON("js/form.json", function(data) { // gets JSON feed from form.json
        
        $.getJSON("js/caldata.json", function(calendarData){ // gets JSON feed from caldata.json
            
        // console.log(calendarData); prints calenderData to console 
        
        // console.log(data);
        $tr = $('<tr></tr>'); // not sure what this does, but something with table rows
        // console.log($tr + " here we are");
        $tr.append($('<th>&nbsp;</th>'));

        //Constructs rows, adds timeline values
        for (var j = 0; j < data.timeline.length; j++) {
            $th = $('<th></th>');
            $th.html('<strong>' + data.timeline[j].timeItemLabel + '</strong>');
            $tr.append($th);
        }
        $tbl.append($tr);
            
            //Populate the topics column
        for (var i = 0; i < data.topics.length; i++) {
            // console.log("Row label: " + data.topics[i].topicLabel);
            $tr = $('<tr></tr>');
            $td = $('<td></td>');
            $td.attr('id', i);
            $td.html(data.topics[i].topicLabel);

            //Add boxes and text areas in each row equal to number of columns
            $tr.append($td);
        for (var j = 0; j < data.timeline.length; j++) {
            $td = $('<td></td>');
            $td.attr('id', 'td_' + data.topics[i].topicID + '_' + data.timeline[j].timeItemID);
            
            $txt = $('<textarea></textarea>');
            $txt.val(getCalendarDataValue(calendarData, data.topics[i].topicID, data.timeline[j].timeItemID));
            $txt.attr('id', 'txt_' + data.topics[i].topicID + '_' + data.timeline[j].timeItemID);
            
            $txt.focusout(function(evt){
                $obj = $('#' + evt.target.id);
                console.log($obj);
                console.log(event.target);
                saveItemData($obj.attr('id'), $obj.val());
            });
            $txt.css('display', 'none');
            
            $div = $('<div></div>');
            $div.attr('id', 'div_' + data.topics[i].topicID + '_' + data.timeline[j].timeItemID);
            if(getCalendarDataValue(calendarData, data.topics[i].topicID, data.timeline[j].timeItemID)){
                $div.html(getCalendarDataValue(calendarData, data.topics[i].topicID, data.timeline[j].timeItemID));
            } else {
                $div.html("&nbsp")
            }
            
            $div.click(function(evt){
                displayEditableText(evt.target.id);
                //console.log("Clicked");
            });

            $td.append($txt);
            $td.append($div);
            $tr.append($td);
        }
            $tbl.append($tr);
        }
        });             
    });
    });
    function saveItemData(controlID, val){
        var topicID, timeItemID;
        var idArray = controlID.split('_');
        var dataToSave = {};
        if(idArray.length == 3){
            topicID = idArray[1];
            timeItemID = idArray[2];
            
            dataToSave.topicID = topicID;
            dataToSave.timeItemID = timeItemID;
            dataToSave.textValue = val;
            
            console.log(dataToSave);
            // $.post('savecalendarentry.php', dataToSave);
        }
    }
        
        function getCalendarDataValue(calData, topicID, timeItemID){
            for(var k = 0; k < calData.caldata.length; k++){
                if(calData.caldata[k].topicID == topicID && calData.caldata[k].timeItemID == timeItemID){
                    return calData.caldata[k].textValue;
                }
            }
        }
        
        function displayEditableText(controlID){ // why does this only work for 1,1 and 3,3?
            var idArray = controlID.split('_');
            // console.log(controlID + " controlID");
            if(idArray.length == 3){ // prints "div" , "rowID", "colID" 
                topicID = idArray[1];
                timeItemID = idArray[2];
                
                $div = $('#div_' + topicID + '_' + timeItemID);
                $txt = $('#txt_' + topicID + '_' + timeItemID);

                $div.css('display', 'none');
                $txt.css('display', 'block');
                // console.log(idArray + " " + controlID);
            }
            
        }
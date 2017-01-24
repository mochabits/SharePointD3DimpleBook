﻿function processChart(whatever, Sprint, SprintArr)		{
		  
  function setupChart(Sprint, SprintArr, BurnDown, DaysorDates){
	  var SprintStart;
	  var SprintEnd;
	  
	  //Remove Prior Run
	  $('svg').remove();
	  $('#buttonControls').remove();
	  $('#buttonStateContainer').remove();
	  $('#buttonToggleContainer').remove();
	  $('#buttonToggleDaysorDatesContainer').remove();
	  
	  var BurnDownText;
	  var BundDownCommand;
	  if (BurnDown)
		  {
			BurnDownText="BurnDown Chart vs";
			BurnDownCommand="BurnUp";
			}
	  else
			{
			BurnDownText="BurnUp Chart vs";
			BurnDownCommand="BurnDown";
			}
		
	  var DaysorDatesText;
	  var DaysorDatesCommand;
	  if (DaysorDates)
		  {
			DaysorDatesText="Days";
			DaysorDatesCommand="Dates";
			}
	  else
			{
			DaysorDatesText="Dates";
			DaysorDatesCommand="Days";
		}	
		
		dropDown.on("click", onSprintButtonsClick);
		
	   //Setup Button for BurnDown Toggle
		var buttonToggleContainer=d3.select("#controlContainer")
			.append("div")
			.attr("id", "buttonToggleContainer");
		 var table1 = buttonToggleContainer.append('table')
					.attr("id","tblHeaders");
					
		var tr=table1.append("tr")	
				.attr("id","firstRow");
				
		tr.append("th")
			.classed("ctrlth", true)
			.html(BurnDownText);
					
		tr.append("th")
			.classed("ctrlth", true)
			.html(DaysorDatesText);	
			
		 table = buttonToggleContainer.append('table')
					.attr("id","tblCommands");	
		tr=table.append("tr")	
				.attr("id","secondRow");
				
		td=tr.append("td")
			.classed("ctrltd", true);
			
		td.append("button")
			.attr("id","btnToggleBurnDown")
			.attr("title", "BurnDown/BurnUp Toggle")
			.html(BurnDownCommand)
			.on("click", onToggleBurnDownClick);
		
		var td=tr.append("td")
			.classed("ctrltd", true);
			
		td.append("button")
			.attr("id","btnToggleDaysorDates")
			.attr("title", "Day/Date Toggle")
			.html(DaysorDatesCommand)
			.on("click", onToggleDaysorDatesClick);
	  
		var whateverSprint=dimple.filterData(whatever, "sprint", Sprint);	
		
		var svg = dimple.newSvg("#dimpleChartContainer");
		var myChart = new dimple.chart(svg, whateverSprint);
		myChart.setBounds(100,50,600,430);
	 
				
		// Add your x axis - nothing unusual here
		if (DaysorDates){
			var x = myChart.addCategoryAxis("x", "Day");
			x.addOrderRule("Day");
		}
		else 
		{
		  var x = myChart.addCategoryAxis("x", "Sprint Day");
		  x.addOrderRule("Sprint Day");
		}
				
		 // y axis changes for burndown and burnup
		  if (BurnDown)
		  {
			var y = myChart.addMeasureAxis("y", "Remaining Hours");
		  }
		  else 
		  {
			var y = myChart.addMeasureAxis("y", "Burned Hours Accumulator");
		  }				  			      
					  
		  y.showGridlines = true;
		  x.showGridlines = true;      

		 var lines = myChart.addSeries("runcycle", dimple.plot.line, [x,y]);

			// Do a bit of styling to make it look nicer
		lines.lineMarkers = true;
		lines.lineWeight = 3;
	 
		var myLegend = myChart.addLegend(640, 50, 60, 100);
		
		myChart.draw();
			
		function onSprintButtonsClick() {
			setupChart(d3.event.target.value,SprintArr, BurnDown, DaysorDates);
			};

		function onToggleBurnDownClick(e) {
			if (BurnDown)
			{
				BurnDown=0;
				}
			else
			{
				BurnDown=1;
				}
			setupChart(Sprint,SprintArr, BurnDown, DaysorDates);					
			};
				
		function onToggleDaysorDatesClick(e) {
			if (DaysorDates)
			{
				DaysorDates=0;
				}
			else 
			{
				DaysorDates=1;
			}
			setupChart(Sprint,SprintArr, BurnDown, DaysorDates);
		};			
		
	};
			 		
		setupChart(Sprint,SprintArr, 1, 1);
	 
};
      
      
  	function getResourceData(Sprint){
	   		
		   var SprintArr = dimple.getUniqueValues(myData, "sprint");
		   console.log(SprintArr);
					  
		   var options = dropDown.selectAll("option")
				.data(SprintArr)
					.enter()
				.append("option");
				
			options.text(function (d) { return d; })
					.attr("value", function (d) { return d; });
		   
		   processChart(myData, Sprint, SprintArr);
			
				
				//console.log(myData);
				
		    
		
	};
	


	
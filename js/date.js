setInterval(displayDate, 3,600,000)
      function displayDate(){
          var time = new Date();
          var date = time.getDate();
          var initial_week_day = time.getDay();
          var date_month = time.getMonth();

          if (initial_week_day == 0) {
              week_day = "Sunday"
            }
            if (initial_week_day == 1) {
              week_day = "Monday"
            }
            if (initial_week_day == 2) {
              week_day = "Tuesday"
            }
            if (initial_week_day == 3) {
              week_day = "Wednesday"
            }
            if (initial_week_day == 4) {
              week_day = "Thursday"
            }
            if (initial_week_day == 5) {
              week_day = "Friday"
            }
            if (initial_week_day == 6) {
              week_day = "Saturday"
            }

          if (date_month == 0){
              month = "January";
            }
            if (date_month == 1){
              month = "Febuary";
            }
            if(date_month == 2){
              month = "March";
            }
            if(date_month == 3){
                month = "April";
            }
            if(date_month == 4){
                month = "May";
            }
            if(date_month == 5){
                month = "June";
            }
            if(date_month ==6){
                month = "July";
            }
            if(date_month == 7){
                month = "August";
            }
            if(date_month == 8){
                month = "September";
            }
            if(date_month == 9){
                month = "October";
            }
            if(date_month == 10){
                month = "November";
            }
            if(date_month == 11){
                month = "December";
            }
          document.getElementById("date").innerHTML = week_day + ", " + month + " " + date;
      }
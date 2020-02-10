javascript: (function() {
    var api_token = "ADD_HERE_YOUR_API_TOKEN";
    var task_jornada_laboral = "ADD_HERE_YOUR_DESIRED_TASK_ID";

    function pad_to_two_digits(number) {
        return (number < 10 ? '0' : '') + number;
    }

    function sendPostToTimecamp(url, data) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 201) {
                data = JSON.parse(data);
                alert(`Time entry created OK ${data.date}, ${data.start_time} - ${data.end_time}`);
            } else if (xhr.readyState === 4 && xhr.status === 403) {
                alert("An error ocurred");
            }
        };
        xhr.send(data);
    }
    if (!location.href.includes("timecamp")) {
        open('https://www.timecamp.com/app#/timesheets/graphical');
    } else {
        var url = "https://api.timecamp.com/third_party/api/entries/format/json/api_token/" + api_token;
        var today = new Date();
        var actual_date = today.getFullYear() + '-' + pad_to_two_digits(today.getMonth() + 1) + '-' + pad_to_two_digits(today.getDate());
        var default_working_time = prompt('Normal work day? (9 - 13 and 14 - 18)', "YES");
        if (default_working_time === "YES") {
            var date = prompt('For which date?', actual_date);
            var data = JSON.stringify({
                "date": date,
                "duration": 4 * 60 * 60,
                "start_time": "09:00:00",
                "end_time": "13:00:00",
                "task_id": task_jornada_laboral
            });
            sendPostToTimecamp(url, data);
            var data = JSON.stringify({
                "date": date,
                "duration": 4 * 60 * 60,
                "start_time": "14:00:00",
                "end_time": "18:00:00",
                "task_id": task_jornada_laboral
            });
            sendPostToTimecamp(url, data);
        } else {
            var date = prompt('Day of this time-entry', actual_date);
            var actual_time = pad_to_two_digits(today.getHours()) + ":" + pad_to_two_digits(today.getMinutes()) + ":" + pad_to_two_digits(today.getSeconds());
            var start_time = prompt('Start time', actual_time);
            var duration = prompt('Duration in minutes', 60);
            today.setMinutes(today.getMinutes() + parseInt(duration));
            var end_time = pad_to_two_digits(today.getHours()) + ":" + pad_to_two_digits(today.getMinutes()) + ":" + pad_to_two_digits(today.getSeconds());
            var task_id = prompt('Tarea', task_jornada_laboral);
            var data = JSON.stringify({
                "date": date,
                "duration": duration * 60,
                "start_time": start_time,
                "end_time": end_time,
                "task_id": task_id
            });
            sendPostToTimecamp(url, data);
        }
    }
})();

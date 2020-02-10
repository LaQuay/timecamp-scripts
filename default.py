import requests

api_token = "ADD_HERE_YOUR_API_TOKEN"
task_jornada_laboral = "ADD_HERE_YOUR_DESIRED_TASK_ID"

# Example for GET time-entry request
#response = requests.get(f"https://www.timecamp.com/third_party/api/users/format/json/api_token/{api_token}")

data = {
    'date': '2019-10-28',
    'duration': '3600',
    'start_time': '10:30:00',
    'end_time': '11:30:00',
    'task_id': task_jornada_laboral
}

# Example for POST time-entry request
response = requests.post(f"https://app.timecamp.com/third_party/api/entries/format/json/api_token/{api_token}", json = data)

print (response.json())

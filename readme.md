# Web Presence
_An WebApp to manage the presences._

### Run Application

```
docker-compose up
```

### Run Mongo Shell
```
 docker exec -it webpresence_mongo_[ID_INSTACE] mongo
```

### Endpoints

#### API

| HTTP Method | Endpoint | Description |
|-------------|----------|-------------|
| GET         | /roles    | Show all roles |
| GET         | /trainee  | Show all trainees |
| GET         | /team     | Show All teams | 
| GET         | /team/trainee/:idTrainee | Show trainee teams |
| GET         | /team/haveWorkToday/:idTeam | Have work today? |
| GET         | /trainee/presence/:idTeam/:idTrainee | Trainee team presence |
| POST        | /team     | Create a new team | 
| POST        | /trainee  | Create new account |
| POST        | /trainee/presence | Check presence
| POST        | /trainee/presence/device | Check presence device

#### Trainee UI

| HTTP Method | Endpoint | Description |
|-------------|----------|-------------| 
| GET         | /#/      | Login page |
| GET         | /logout  | Logout from application | 
| GET         | /trainee/home/:idTrainee | Show dashboard of trainee |
| GET         | /trainee/team_details/:teamId/:userId | Team details |
| POST        | /login   | Try login in application |

#### Admin UI

| HTTP Method | Endpoint | Description |
|-------------|----------|-------------|
| GET         | /admin/home/:userId | Admin home page |
| GET         | /team/create | Create Team |

### Entities

#### User

```json
{
  "name" : "Name user",
  "phone_mac" : [ "F0:C7:7F:EB:89:5E", "MAC's of user phone" ],
  "email": "username@mail.com",
  "username": "username",
  "pass": "user_password",
  "roles": [
    { 
      "name": "Trainee",
      "type": "TRAINEE"
    }
  ]
}
```

#### Role

```json
{
  "name": "Role name",
  "type": "ROLE_NAME"
}
```

#### Team

```json
{
  "date_init": "2018-11-12T02:40:52.351+0000",
  "date_end": "2019-11-12T02:40:52.351+0000",
  "trainees": [{ ...User }],
  "days": [{ ...Day }],
  "mac_ap" : "F0:C7:7F:EB:89:5E",
  "name": "Team name",
  "distance": 10,
  "percent": 75,
  "detect_type": "WIFI"
}
```

#### Day

```json
{
  "date": { 
    "day_name": "Wednesday", 
    "id": 3,
   },
  "time_init": "12:00",
  "time_end": "16:00",
  "check_presence": [
    { 
      "time_init": "14:00", 
      "duration": 60
     }
  ]
}
```

#### Presence

```json
{
  "date": "2018-11-12T02:40:52.351+0000",
  "trainee": ...User,
  "team": ...Team,
  "checks": 3,
  "percents": [55.44, 80.77],
  "average": 68.10,
  "valid": true,
  "lastCheck": false
}
```
# Web Presence
_See wiki to access the endpoints that exits._

### Run Application

```
docker-compose up
```

### Run Mongo Shell
```
 docker exec -it webpresence_mongo_1 mongo
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
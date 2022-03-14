# CRUD Operation
This application is an example of a CRUD operation between the Laravel API backend and the NextJS frontend.

## Setup
Get the code by either cloning this repository using git
```sh
git clone https://github.com/mbparvezme/ip-test.git
```
... or downloading [source code](https://github.com/mbparvezme/ip-test/archive/refs/heads/master.zip) as a zip archive.

## API Backend
The api folder contains the backend part of the system. The backend of the application is developed with Laravel, the best existing PHP framework in the market. The [Sanctum](https://laravel.com/docs/9.x/sanctum) library is working under the hood with Laravel 9 for authentication and authorization.

### Requirements
- PHP ^7.3|^8.0
- Database MySQL, PostgreSQL, SQLite
- Web Server Apache

### Backend Installation
Follow the following steps to set up the backend API of the application

- Go to the **api** folder and copy the .env.example file and rename it to .env
- Create a database on your server and configure the following database settings in the .env file with your database configuration:
```
DB_DATABASE=ip_app
DB_USERNAME=root
DB_PASSWORD=
```
- Import the *database.sql* file in your database to populate the tables and demo data. Or you can run the following artisan migration command to avoid manual importing.
```sh
php artisan migrate
```

```sh
php artisan db:seed
```
### Access API
After successful installation of the backend and database, you can access the API with the demo users credentials given below:
> User ID: user1@email.com
> Password: password1

or

> User ID: user2@email.com
> Password: password2

### API Endpoints
| Details                | Method | API End Points            |
| ---------------------- | ------ | ------------------------- |
| Register               | POST   | [/register](#)            |
| Login                  | POST   | [/login](#)               |

Authenticated routes
| Details                | Method | API End Points            |
| ---------------------- | ------ | ------------------------- |
| Get All IP             | GET    | [/ip](#)                  |
| Add New IP             | POST   | [/](#)                    |
| Update an IP           | PUT    | [/{id}](#)                |
| Get all logs           | GET    | [/log](#)                 |
| Logout                 | GET    | [/logout](#)              |

> Note: You will need an authentication token to access the authenticated routes. The token will be generated with a successful registration or login.

## Frontend
The nextjs folder contains the frontend part of the application. To install the frontend, `cd` to the **nextjs** directory and run the following commands:
```sh
# go to the directory
cd nextjs

# install dependencies
npm install

# run application
npm run dev
```
> Note: the `cd nextjs` is relative with your current path

## Building

Run the following command to publish this application:
> Publish the backend on a production server and modify the `API_URL` in `nextjs/.env` accordingly

```bash
npm run build
```

For any help or reviews, please visit [www.mbparvez.me](https://www.mbparvez.me)
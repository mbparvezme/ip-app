# Simple CRUD Operation
This application is an example of a simple CRUD operation between the Laravel API backend and the NextJS frontend.

## Laravel
In this project, Laravel is working as a backend API application. The package [Sanctum](https://laravel.com/docs/9.x/sanctum) is working under the hood with Laravel 9 for authentication and authorization.

## NextJS
The frontend of the application has been developed by NextJS version `12.1.0`. It is connected with the backend to serve and populate data.

# Setup
Get the code by either cloning this repository using git
```
git clone https://github.com/mbparvezme/ip-test.git
```
... or downloading [source code](https://github.com/mbparvezme/ip-test/archive/refs/heads/master.zip) as a zip archive.

## Setup Backend
There are two API folders in the repository. The api-production version is ready for production use. Again, if you want to configure the backend, you can work with the api-development. In both cases, you just need to configure the database in .env.

## Setup Frontend
To make the frontend ready to use `cd` to the **nextjs** directory and run the following commands
```bash
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

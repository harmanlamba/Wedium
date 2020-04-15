# Wedium
Wedium is a social media platform, built using the public Wikipedia APIS. Influenced by forum-based apps such as Reddit, and Medium, in combination with annotation apps such as Perusall, allow users to share interesting Wikipedia articles, comment and ask questions about the article. Wedium provides a social hub and a sense of community to the users of Wikipedia.

## Before Contributing
Be sure that you are aware of our license, code and GitHub conventions and our git workflow before contributing to Wedium.

## Setup Guide
### Prerequisites
We recommend the usage of Visual Studio for the development of the backend and your choice of text editor for the frontend.

* Ensure you have installed the `.NET Core 3.1` SDK.
    * If using Visual Studio, also ensure the `ASP.NET and Web Development Tools` package is installed.
* Ensure `NPM / NodeJS` is installed to run the frontend.

### Setup Steps
1. Find and open `WediumBackend.sln` in `./WediumBackend`.
2. Add the `WediumDatabase` connection string and `JwtSecret` into `appsettings.json` _(contact a team-member to obtain values)_.
3. Build the project and launch `WediumAPI` in Visual Studio. This will install the necessary NuGet packages and launch IISExpress. 
4. Naviagate to the frontend folder in `./WediumFrontend` in a command line tool.
5. Run `npm install` in the command line tool to download and install frontend dependencies.
6. Create a `.env.development` file in `./WediumFrontend`. Add the `REACT_APP_API_URL` and `REACT_APP_GOOGLE_CLIENT_ID` settings to the file _(contact a team-member to obtain values)_.
7. Run `npm start` in the command line tool to start the React development server.
8. The default internet browser will redirect to the home page (`http://localhost:3000/`). This should be successfully connected to the backend.

## Team Members

| Name                | UPI                | GitHub Account                |
|---------------------|--------------------|-------------------------------|
| Jainal Gandhi       | jgan963 | JainalGandhi |
| Harman Lamba        | hlam132 | harmanlamba |
| Eric Leung          | eleu033 | itsercleung |
| Salma Sanad         | ssan631 | salma-s |

Made with love 👨‍👨‍👧‍👦💖

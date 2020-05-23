# Wedium ![](https://media.discordapp.net/attachments/688842397022421050/713713863488569404/cake3.png)
![.github/workflows/dotnetcore.yml](https://github.com/harmanlamba/Wedium/workflows/.github/workflows/dotnetcore.yml/badge.svg?branch=master)
![Node.js CI](https://github.com/harmanlamba/Wedium/workflows/Node.js%20CI/badge.svg?branch=master)

A social media platform built around Wikipedia.

Influenced by forum-based apps such as Reddit, and Medium, in combination with annotation apps, allow users to share interesting Wikipedia articles, comment and ask questions about the article. Wedium provides a social hub and a sense of community to the users of Wikipedia.

## Wedium Features
* **Browse and Search Posts**: Browse posts created by other users, filter posts based on post-types, or search for posts by inserting keywords in the searchbar.
* **Create Posts**: Easily create a new post by providing a title, Wikipedia URL and an optional description.
* **Liking and Saving Posts**: Posts can be liked and saved by logged in users; perfect for re-visiting later.
* **Viewing Posts**: Read the wikipedia article directly from Wedium.
* **Commenting on Posts**: Comment on posts to share your thoughts. Wedium supports replying to other comments and liking comments. Comments can also be marked as questions to promote response from other users.
* **Quoting Text**: See some text in the article worthy of a comment. Simply highlight the text to quote it. Your comments can be formatted/styled how you want it with the use of Wedium's quirky comment box; it supports bold, italics, quoting, links bulletpoints and more.
* **Viewing Profile**: Wedium users can view their recent activity, including recently liked, saved and created posts.
* **Secure Authentication**: Wedium uses Google Authentication to manage authentication.

## Screenshots
![](https://media.discordapp.net/attachments/688842397022421050/713707932302180413/wedium1.gif?width=709&height=351)
![](https://media.discordapp.net/attachments/688842397022421050/713707938375532614/wedium2.gif?width=709&height=351)

## Prerequisites
* Ensure you have installed the `.NET Core 3.1` SDK. If using Visual Studio, also ensure the `ASP.NET and Web Development Tools` package is installed.
* Ensure `NPM / NodeJS` is installed to run the frontend.

_We recommend the usage of Visual Studio for the development of the backend and your choice of text editor for the frontend._

## Installing Wedium
### Backend Setup
1. Find and open `WediumBackend.sln` in `./WediumBackend`.
2. Add the `WediumDatabase` connection string and `JwtSecret` into `appsettings.json` _(contact a team-member to obtain values)_.
3. Build the project and launch `WediumAPI` in Visual Studio. This will install the necessary NuGet packages and launch IISExpress. 

### Frontend Setup
1. Naviagate to the frontend folder in `./WediumFrontend` in a command line tool.
2. Run `npm install` in the command line tool to download and install frontend dependencies.
3. Edit the `.env.development` file in `./WediumFrontend`. Add the required settings _(contact a team-member to obtain values)_.
4. Run `npm run start` in the command line tool to start the React development server.
5. The default internet browser will redirect to the home page (`http://localhost:3000/`). This should be successfully connected to the backend.

### Database
_Contact a team member to obtain details regarding the database._

## Testing Wedium
### Backend Testing
1. Find and open `WediumBackend.sln` in `./WediumBackend`.
2. Ensure the Test Explorer window is open (Test > Test Explorer).
3. Find `WediumTestSuite` in the solution explorer. Right click the project and select `Run Tests`.

### Frontend Testing
1. Naviagate to the frontend folder in `./WediumFrontend` in a command line tool.
2. Run `npm run test` in the command line tool.

## Wedium Documentation
We're using [GitHub Wiki](https://github.com/harmanlamba/Wedium/wiki) to document Wedium's development.

## The Wedium Team
Thanks to the following people who have contributed to the project.
* [@JainalGandhi](https://github.com/JainalGandhi) (jgan963)
* [@harmanlamba](https://github.com/harmanlamba) (hlm132)
* [@itsercleung](https://github.com/itsercleung) (eleu033)
* [@salma-s](https://github.com/salma-s) (ssan631)

If you wish to start contributing then reach out to one of the listed team members! Be sure to read about our [license](https://github.com/harmanlamba/Wedium/wiki/Licensing), [code](https://github.com/harmanlamba/Wedium/wiki/Code-Conventions) and [GitHub](https://github.com/harmanlamba/Wedium/wiki/Github-Conventions) conventions and our [Git Workflow](https://github.com/harmanlamba/Wedium/wiki/Git-Workflow).

## License
This project uses the following license: [GPL-2.0](https://raw.githubusercontent.com/harmanlamba/Wedium/master/LICENSE?token=AKDPS4BEBI4ENRKH6OLSEI262CUFC)
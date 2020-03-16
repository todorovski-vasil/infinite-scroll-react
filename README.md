This application aims to provide a mock-up for the possible solutions, or part of the solutions that can be used to implement the list of one million books.

The list is generated in the "./utils/generateBookstoreData.js" file, and the root Component in charge of displaying the data is in "./components/BooksList.jsx". The data transformation functions (sorting and filtering) are saved in the "./utils/booklistTransformations.js" together with their unit-tests. For the purposes of cleaner code conserning displaying of the loader screen, a custom hook is built and used ("./hooks/useStateProper.js").

Because of performance limitations, only 1000 records are displayed at one time. Scrolling the page near the bottom or top of the page, moves the offset by 100 records up or down the full list. In that way we are able to traverse the whole list in a seamless way. The provided solution can easily be adjusted to retrieve the data from a web service which has the required fitering and sorting abilities.

On the top of the component, we can find the buttons and radio button groups, which trigger the sorting and filtering of the list.

The books from the "horror" genre which are published on Halloween are marked in orange, and the books from the "finance" genre which are published on the last friday of the month are marked in gray.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

After cloning the project run the following script in the project directory in order to download the dependencies:

### `npm install`

After that process finishes, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# Prize Picks Clone

This project is intended for demonstration purposes only. The goal is to showcase my front-end design and development skills utilizing the React framework. Many areas could be refactored to be more DRY, particularly in the css files, however that work can be saved for later. Right now the most important outcome is to deliver a working demo.

## Run The App

- Fork or clone the repo to your local environment.
- In the project directory, run `npm start` to start the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload when you make changes. You may also see any lint errors in the console.
- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Layout with HTML and CSS

- Rendered the `app.js` component with shared `header` and `footer` components.
  
- Created a fixed position `header` element and a scrollable section that contains the `main` and `footer` elements
  
- Utlized appropriate linked `css` files tied to components.

- In the future other css methods could be used such as:

   - inline css

  - css modules, or

  - styled components

- Rendered images to the page from local directories, basically the `favicon` and the `logo.svg`.

- Note: Other images throughout the demo are linked to external reosurces and if changed have potential to break in the future.

## Routing and Data Source

- Routing is handled by `react-router-dom` and is leveraged to update the `main` element when a navigation link is clicked.

- The data was initially sourced from this api endpoint:

  - [https://api.prizepicks.com/projections](https://api.prizepicks.com/projections?league_id=7&per_page=250&state_code=UT&single_stat=true&game_mode=pickem)
 
- That data was scrubbed utlizing a filter script to create an new array of objects.

  - The filter removed that original `[data]` array, and renamed the `included` array to now be called `[data]`.

  - This data set targets the `"type": "new_player"` objects to access player profile data.
 
- The extracted data was save locally in the `public` directory as `data.json` to be used for development purposes.

- Data is accessed utlizing `Axios` to make a `get` request to the `data.json` file.

## Pages and State Management

**Home Page**
- This Home page acts primarily as a static landing page and estalblishes the visual design of the app

- Some links (e.g. Sign Up & Login) lead off site to [https://app.prizepicks.com/](https://app.prizepicks.com/) for demo puposes.

**Available Page**
- The Available page maps the tabs array to create a list of buttons, which can toggle the map image and text description content.

- The `activeTab` and `setActiveTab` state is initialized to set the active tab to the first tab initial load.

- An `onClick` event handler is triggered when a tab button is click which updates the state and set a dynamic css class to the active tab.

**Players Page**
- `useState` is utilized to set up state to track the player's data, loading state, and error state.

  - We set the initial state of the players data to an empty array.

   - We wet the initial state of the loading state to true.

   - And, we set the initial state of the error state to an empty string.
 
- `useEffect` is utilized to fetch data from the JSON file with an `axios` get request.

  - A `try` block returns a list of players and their attributes.

  - A `catch` block logs an error if the data cannot be fetched.

  - In the `useEffect` hook triggers the an empty dependency array limits the requests and prevents re-renders. 

## Directory Structure
-public
  - index.html
  -  data.json
  -  reset.css
  -  favicon.ico
- src
  - assets
    - images
      - logo.svg
    - styles
      - Header.css
      - Footer.css
      - Main.css
      - Home.css
      - Available.css
      - Players.css
  - components
    - Header.js
    - Footer.js
  - pages
    - Home.js
    - Available.js
    - Players.js
  - App.js
  - App.css
  - index.js
  - index.css



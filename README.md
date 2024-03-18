# PrizePicks Clone

This project is intended for demonstration purposes only. The goal is to showcase my front-end design and development skills utilizing the React framework. Recent changes include updating code to connect to a Ruby backend running Roda, and a PostgreSQL database.

## Branches

- `main` represents our source of truth for the most up to date version intended for production.

- `develop` was added to be as a default branch to test and stage futures changes and connects to the Ruby backend.

  - Todo: Upload Ruby backend to separate GitHub repo.
  
  - Todo: Update documentation to include running the back-end
 
  - Todo: Update documentation to include how to run the Python migration file for the PostgreSQL DB.
 
- `data-local` was created to preserve the initial implementation that utilizes locally stored data.


## TLDR

This app demonstrates several UX/UI concepts and more advanced React methods like `useState`, `useEffect`, `useCallback`, `useMemo` and the `React Context API`. Data was accessed via an `Axios` get request and navigation is handled by `React Router DOM`. The app is naturally mobile responsive and utilizes both `CSS Grid` and `Flexbox`.

- Level I = The **Home** page is a simple landing page to show off some UX/UI skills utilizing HTML and CSS. An animation was added here using keyframes.

- Level II = The **Where To Play** page has the interactive map to demostrate some basic state and tabbed browsing.

- Level III = The **Meet The Players** page demonstrates connecting to a data source and manipulating data. Search functionality is implemented with a debounce function.
  
- Level IV = The **Search History** page is used to store the last 20 search queries using the Context API for state menagement between two pages.

- There is also a **Help page** which is a simple fun page with a message that matters.

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

  - The filter removed that original `[data]` array.

  - Then the `included` array was renamed to now be called `[data]`.

  - This data set targets the `"type": "new_player"` objects to access player profile data.
 
  - A random number generator helper function was added to populate the score attribute.
 
- The extracted data was saved locally in the `public` directory as `data.json` to be used for development purposes.

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

- `useState` is also utilized to set up state to track the search query.
 
- `useEffect` is utilized to fetch data from the JSON file with an `axios` get request.

- Some logic was added to get current location and create a new object to extract the query parameter from the search string.

- `useEffect` is utilized  to update the search query state when the location changes.

- A debounce function was added so that search history only get tracked after a 2 second pause in the input field.

- An event handler was added to handle the search query input change, update search query state and call the debounced query function.

- An event handler was added to the cancel button click to clear the search query state.

- The filter was enhanced to filter the players based on the search query input.

-  An additional helper function was impleneted to generate a random number for the points data attribute.

-  React Context API is used to store and share the search history. Local storage is used to preserve the search history when the browser is refreshed.

-  Session storage is used for persisting the points across the session. When the session is closed the points data resets.

**Search History Page**

- A `SearchContext` file was implemented to `createContext` with a custom hook and set up a `SearchProvider` that wraps the app with the search content.

- This helps search queries registered on the `Players.js` to be stored in the `SearchHistory.js` page. The most recent 20 search strings are stored.

- `localStorage` was utlized so that the search history is pesistent when the browser is refreshed. History can be reset by clicking a button on the page.

- Clicking a link on the `SearchHistory.js` page drives the user back to the `Players.js` page and loads the historical search params.

**Help Page**

- A simple help page was added with a fun message and an embedded video using `react-youtube`.

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
      - Available.css
      - Footer.css
      - Header.css
      - Help
      - Home.css
      - Players.css
      - SearchHistory.css
  - components
    - Footer.js
    - HeadereoEmbed.js
    - Vid
  - context
    - SearchContext.js
  - pages
    - Available.js
    - Help.js
    - Home.js
    - Players.js
    - SearchHistory.js
  - utils
    - debounce.js
    - positionMapping.js
    - randomNumber.js
  - App.js
  - App.css
  - index.js
  - index.css



# City Weather App

Simple and hussle-free weather check service designed to leverage from minimalistic style.
Just enter name of the city of your interest and check current weather.

Give it a try! [Follow the link]()

## How to run the app locally?
- Add .env file with environment variables (``REACT_APP_OPEN_WEATHER_API_KEY``, ``REACT_APP_OPENCAGE_API_KEY``) to the root folder (not committed to the repository).
``https://opencagedata.com`` service is used to retrieve city name by coordinates and vice versa.
- Run npm i to install all the packages.
- Run npm run start

## App features
- Two routes only are available: ``/`` and ``/city/:name``. The last one is protected by city data existence at store check.
- The user is asked to grant access for geolocation on first visit.
If so, current location weather is shown (if found). City name is retrieved by lat and lng coordinates.
- Modal is shown on incorrect city name input.
- All the stored cities' weather is updated on initial load.
- There's a possibility either to update stored city weather or to remove it.
- Cloudiness icon is located next to city name. Its' appearance depends on current cloudiness value.
- Rain or snow icon is displayed if present only.
- There's a temperature widget located at detailed city weather info page. Hourly forecast is used (number of items varies depending on current time).
Each item is positioned and coloured according to its value.

## Project file structure
- App.js - core component. All the routes are mapped here. Redux store and MUI theme connection are handled here as well.
- Redux actions are located at ``/src/actions``. Single reducer (appReducer) is located at ``/src/reducers``.
Store persisting logic on reload belongs to ``/src/store/store.js`` file.
- There're 2 pages at the app (main page - ``Index`` and detailed city weather info - ``City``). They're located at ``/src/pages``.
- Other components may be found at ``/src/components``.
- 3d party APIs are handled at ``/src/services``.
- There're 2 types of utils: common (``/src/utils/utils``) and project logic specific ones (``/src/utils/appUtils``).
- ``/src/styles`` folder contains resetting styles and MUI theme initialization.

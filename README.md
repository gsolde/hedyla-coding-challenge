# React route calculator - Coding assignment

Simple route & route cost calculator providing origin and destination or manually introduced distance, powered by react-google-maps-api & project OSRM.
This is a quick coding challenge with no responsiveness & no testing. 

# Features

1. Introduce the distance.
2. Introduce the €/km.
3. Calculate the total cost of the route.
4. In addition to the ability to introduce the distance manually, adding another option to calculate it from the origin and destination coordinates would simplify      the process, so let’s add this feature (use OSRM API). Let the user introduce the origin and destination coordinates, and calculate the distance automatically.
5. Add a couple of predefined fees (€/Km), e.g. Truck → 0.50€/Km, Van → 0.25€/Km
6. Draw origin and destination in a map, and plot the route between them.
7. Use Redux to request the information to the API.
8. Replace the coordinates inputs by address inputs that geolocate the coordinates using an external service (Google Maps API, Mapbox API...).

### To run the app:
 
- **1. Fork or clone the repo.**
- **2. Install dependencies.**

  Run ```npm i``` in the project folder.
  
- **3. Google API key.**

  Create a .env file in the root folder and add your Google API Key as follows: <br /><br />
  REACT_APP_GOOGLE_API_KEY=yourGoogleAPIKey
  
- **4. You're all set!**

  Run ```npm start``` in the root folder to start the app in development mode.


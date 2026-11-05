// ** JavaScript Starter File **
// Purpose: Populate a dropdown of upcoming launches and display mission details
// and a rocket image using callbacks (Part 1), then refactor to promises (Part 2).

// Space Devs development endpoint: no rate limits, but the data is stale and limited.
const BASE_URL = "https://lldev.thespacedevs.com/2.3.0";

// ---------------------------------------------------------------
// PART 1: XMLHttpRequest and callbacks
// ---------------------------------------------------------------

// Step 1: Create getUpcomingLaunches(callback)
// - Makes a GET request to BASE_URL + "/launches/upcoming/"
// - Parses the response
// - Calls the callback function and passes the results array
function getUpcomingLaunches() {
  axios
    .get(BASE_URL + "/launches/upcoming/")
    .then(function (response) {
      populateDropdown(response.data.results);
    })
    .catch(function (error) {
      console.log(error.message); // temporary, replaced in Step 7
    });
}

// Step 2: Create populateDropdown(launches)
// - Receives an array of launches
// - Adds one <option> per launch: text = launch name, value = launch id
function populateDropdown(launches) {
  const dropdown = document.getElementById("launchDropdown");

  launches.forEach(function (launch) {
    const option = document.createElement("option");
    option.textContent = launch.name;
    option.value = launch.id;
    dropdown.appendChild(option);
  });
}

// Step 3: Add event listener to #launchDropdown
// - On change, get the selected launch ID
// - Call getLaunchDetails(launchId, callback)
document.getElementById("launchDropdown").addEventListener("change", function () {
  const launchId = this.value;
  getLaunchDetails(launchId);
});

// Step 4: Create getLaunchDetails(launchId, callback)
// - Makes a GET request to BASE_URL + "/launches/" + launchId + "/"
// - Parses the response and passes the launch object to the callback
function getLaunchDetails(launchId) {
  axios
    .get(BASE_URL + "/launches/" + launchId + "/")
    .then(function (response) {
      displayLaunchInfo(response.data);
    })
    .catch(function (error) {
      console.log(error.message); // temporary, replaced in Step 7
    });
}

// Step 5: Create displayLaunchInfo(launch)
// - Updates #missionDetails with the mission name and description (if available)
// - Creates an image of the rocket (launch.rocket.configuration.image.image_url) and appends it to #rocket
// - If no image is available, displays a message instead
function displayLaunchInfo(launch) {
  const details = document.getElementById("missionDetails");
  const rocket = document.getElementById("rocket");

  details.innerHTML = "";
  rocket.innerHTML = "";

  const name = document.createElement("h2");
  name.textContent = launch.name;
  details.appendChild(name);

  const description = document.createElement("p");
  if (launch.mission && launch.mission.description) {
    description.textContent = launch.mission.description;
  } else {
    description.textContent = "No description available for this mission.";
  }
  details.appendChild(description);

  const config = launch.rocket && launch.rocket.configuration;
  if (config && config.image && config.image.image_url) {
    const img = document.createElement("img");
    img.src = config.image.image_url;
    img.alt = "Image of the " + config.name + " rocket";
    rocket.appendChild(img);
  } else {
    const message = document.createElement("p");
    message.textContent = "No rocket image available.";
    rocket.appendChild(message);
  }
}

// Final step: kick off the flow
getUpcomingLaunches();

// ---------------------------------------------------------------
// PART 2: Axios and promises (refactor after Part 1 is committed)
// ---------------------------------------------------------------
// - Replace both XHR requests with axios.get(...).then(...).catch(...)
// - Show "Loading..." in #status while a request is pending
// - Show a clear error message in #status when a request fails
// - Clear the status message when data arrives
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
function getUpcomingLaunches(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", BASE_URL + "/launches/upcoming/");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      callback(data.results);
    }
  };

  xhr.send();
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
  // TODO: Get selected launchId
  // TODO: Call getLaunchDetails
});

// Step 4: Create getLaunchDetails(launchId, callback)
// - Makes a GET request to BASE_URL + "/launches/" + launchId + "/"
// - Parses the response and passes the launch object to the callback
function getLaunchDetails(launchId, callback) {
  // TODO: Implement XHR GET request for a single launch
}

// Step 5: Create displayLaunchInfo(launch)
// - Updates #missionDetails with the mission name and description (if available)
// - Creates an image of the rocket (launch.rocket.configuration.image.image_url) and appends it to #rocket
// - If no image is available, displays a message instead
function displayLaunchInfo(launch) {
  // TODO: Display mission name and description
  // TODO: Display the rocket image
}

// Final step: kick off the flow
getUpcomingLaunches(populateDropdown);

// ---------------------------------------------------------------
// PART 2: Axios and promises (refactor after Part 1 is committed)
// ---------------------------------------------------------------
// - Replace both XHR requests with axios.get(...).then(...).catch(...)
// - Show "Loading..." in #status while a request is pending
// - Show a clear error message in #status when a request fails
// - Clear the status message when data arrives
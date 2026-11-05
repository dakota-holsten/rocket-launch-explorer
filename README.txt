Rocket Launch Explorer

GitHub repository: https://github.com/dakota-holsten/rocket-launch-explorer

How the callback version works
getUpcomingLaunches(callback) sends an XMLHttpRequest to the upcoming launches endpoint. When readyState is 4 and the status is 200, it parses the response with JSON.parse() and runs the callback it was given, passing in the results array. The page passes populateDropdown as that callback, so the dropdown fills only after the data has arrived. getLaunchDetails(launchId, callback) works the same way, passing the launch object to displayLaunchInfo.

What changed in the Axios version
Both requests now use axios.get() instead of XMLHttpRequest, and the callback parameters were removed. The .then() handler runs when the data arrives: it clears the "Loading..." message, reads response.data, and calls populateDropdown or displayLaunchInfo directly. The .catch() handler runs when a request fails and shows an error message, including the error's message, in the status line.
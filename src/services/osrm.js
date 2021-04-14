export function getRoutes() {
  fetch(
    `http://router.project-osrm.org/route/v1/driving/2.0088747,41.563211;2.2459643,41.4473147?alternatives=true&geometries=polyline&steps=true`
  )
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

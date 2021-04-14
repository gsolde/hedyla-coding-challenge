export default function getRoutes(org, dest) {
  fetch(
    `http://router.project-osrm.org/route/v1/driving/${org.lng},${org.lat};${dest.lng},${dest.lat}?alternatives=true&geometries=polyline&steps=true`
  )
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

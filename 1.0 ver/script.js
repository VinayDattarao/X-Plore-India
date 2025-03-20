'use strict';

/**
 * navbar toggle
 */
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
};

navToggleEvent(navElemArr);

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");
const logoImg = document.querySelector(".header-top .logo img");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
    logoImg.classList.add("rotate");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
    logoImg.classList.remove("rotate");
  }
});


const topTouristPlaces = [
  {
    name: "Taj Mahal",
    location: "Agra, India",
    description: "An ivory-white marble mausoleum on the south bank of the Yamuna river.",
    image: "taj.jpeg",
    rating: 5,
    reviews: 9843,
    coordinates: { lat: 27.1751, lng: 78.0421 }
  },
  {
    name: "Leh-Ladakh",
    location: "Jammu and Kashmir, India",
    description: "Known for its stunning landscapes, Buddhist monasteries, and adventure activities.",
    image: "lad.jpeg",
    rating: 5.0,
    reviews: 6078,
    coordinates: { lat: 34.1526, lng: 77.5771 }
  },
  {
    name: "Goa",
    location: "Goa, India",
    description: "Known for its beaches, Portuguese heritage, and vibrant nightlife.",
    image: "goa.jpeg",
    rating: 4,
    reviews: 3489,
    coordinates: { lat: 15.2993, lng: 74.1240 }
  },
  {
    name: "Tirupati",
    location: "Tirupati, India",
    description: "Known for its Sacred Temples, and their Gods.",
    image: "tir.jpeg",
    rating: 4.5,
    reviews: 3214,
    coordinates: { lat: 13.6288, lng: 79.4192 }
  },
  {
    name: "Jaipur",
    location: "Rajasthan, India",
    description: "The Pink City, known for its majestic palaces, forts, and vibrant bazaars.",
    image: "j (2).jpeg",
    rating: 5,
    reviews: 2247,
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    name: "Kerala",
    location: "Kerala, India",
    description: "Known for its palm-lined beaches, backwaters, and network of canals.",
    image: "k (2).jpeg",
    rating: 4.5,
    reviews: 1145,
    coordinates: { lat: 10.8505, lng: 76.2711 }
  },
];

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lat2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d.toFixed(1);
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function updateDestinations(userCoordinates) {
  const destinationList = document.querySelector(".popular-list");
  destinationList.innerHTML = "";

  topTouristPlaces.forEach(place => {
    const distance = getDistanceFromLatLonInKm(
      userCoordinates.lat,
      userCoordinates.lng,
      place.coordinates.lat,
      place.coordinates.lng
    );

    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="popular-card">
        <figure class="card-img">
          <img decoding="async" src="${place.image}" alt="${place.name}" loading="lazy">
        </figure>
        <div class="card-content">
          <div class="card-rating">
            ${place.rating} <span>(${place.reviews} reviews)</span>
          </div>
          <p class="card-subtitle">
            <a href="#">${place.location}</a>
            <span class="distance">(${distance} km)</span>
          </p>
          <h3 class="h3 card-title">
            <a href="#">${place.name}</a>
          </h3>
          <p class="card-text">
            ${place.description}
          </p>
        </div>
      </div>
    `;
    destinationList.appendChild(listItem);
  });
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const userCoordinates = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      updateDestinations(userCoordinates);
    }, () => {
      alert("Geolocation is not supported by this browser.");
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

document.addEventListener("DOMContentLoaded", getUserLocation);

document.querySelector(".btn.btn-secondary").addEventListener("click", function() {
  window.location.href = "mailto:vinaydattarao@gmail.com";
});

function scrollToFooterTop() {
  const footerTop = document.querySelector('.footer-top');
  footerTop.scrollIntoView({ behavior: 'smooth' });
}
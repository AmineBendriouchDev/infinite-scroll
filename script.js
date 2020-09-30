// DOM Elements
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

// Photo
let photos = [];
let ready = false;
let photosLoaded = 0;
let photosTotal = 0;
let initialLoad = true;
let isInitialLoad = true;

// Unsplash API
let count = 5;
const apiKey = '_DvC8OnanmnCBVzindK7t-ySRtlu1xngskW2xaTx9Ak';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Update API URL
function updateApiUrlWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Check if all photos are loaded
function loadPhotos() {
  photosLoaded++;
  if (photosLoaded === photosTotal) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
  photosLoaded = 0;
  photosTotal = photos.length;

  // Run function for each object in photos array
  photos.map((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', loadPhotos);

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    if (isInitialLoad) {
      updateApiUrlWithNewCount(30);
      isInitialLoad = false;
    }
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  /**
   * window.innerHeight = The height of the window
   * window.scrollY = The scrollY position
   * document.body.offsetHeight = The height of all document
   */
  if (
    window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();

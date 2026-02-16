<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDxYFJMneQI9H-1_z5zWZb1UE6FI8VdVqY",
    authDomain: "helpchef-7a116.firebaseapp.com",
    projectId: "helpchef-7a116",
    storageBucket: "helpchef-7a116.firebasestorage.app",
    messagingSenderId: "290332868653",
    appId: "1:290332868653:web:3aeafbd369a5881ffcb8a4",
    measurementId: "G-M0DWPZ33Y4"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

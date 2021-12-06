import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWhNsZHcyNiu0OyXI7waCsCKmqPpx9K1o",
  authDomain: "hotel-management-web-app.firebaseapp.com",
  projectId: "hotel-management-web-app",
  storageBucket: "hotel-management-web-app.appspot.com",
  messagingSenderId: "770798199251",
  appId: "1:770798199251:web:d92f58ad48efb944a88f26",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };

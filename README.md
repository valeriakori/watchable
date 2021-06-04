# A Vue.JS Project using Firestore and the TMDB API (and some Windows XP Nostalgia)

1. Setup

    1. Create a vue app
    
    vue create watchable
    

    Add fonts and css libraries by adding cdn links to index.html
    
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Monoton&family=Montserrat:wght@400;700&display=swap"
    rel="stylesheet">
    

    Create a new folder and file src/firebase/firebase.js. This is where the firebase config object will go and where we instantiate the firestore interface (used for having CRUD interactions with the database)

    2. Setup Firebase

        1. Go to the [firebase console](https://console.firebase.google.com/) and create a new project.
        2. Setup Firestore Database with some mock data

        Make sure your rules in the Rules tab next to Data look like this 
        
        rules_version = '2';
        service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
            allow read, write: if true;
            }
          }
        }
        

        The line allow read, write: if true; is set to falseby defalt, so you won't be able to access your data

        3. Add an app in Project Settings

    3. Create a (TMDB account)[https://www.themoviedb.org/] to get an api key.

2. READ categories from firestore
3. READ movies from database
4. READ movies from TMDB
5. CREATE new movie
6. UPDATE existing movie
7. DELETE movie
8. Host your project, e.g. on [Netlify](https://www.netlify.com/)
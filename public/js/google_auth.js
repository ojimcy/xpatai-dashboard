let app;
fetch('/firebase-config')
  .then((response) => response.json())
  .then((firebaseConfig) => {
    app = firebase.initializeApp(firebaseConfig);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    if (document.getElementById('google-sign-in')) {
      document
        .getElementById('google-sign-in')
        .addEventListener('click', () => {
          firebase.auth().signInWithRedirect(provider);
        });
    }
    if (document.getElementById('google-sign-up')) {
      document
        .getElementById('google-sign-up')
        .addEventListener('click', () => {
          firebase.auth().signInWithRedirect(provider);
        });
    }
    if (document.getElementById('google-sign-out')) {
      document
        .getElementById('google-sign-out')
        .addEventListener('click', () => {
          firebase.auth().signOut();
          return false;
        });
    }

    firebase.auth().onAuthStateChanged(function (user) {
      if (app && user && document.getElementById('google-sign-up')) {
        user
          .getIdToken()
          .then(function (token) {
            // display register form here
            const nameInput = document.getElementById('name-input');
            const emailInput = document.getElementById('email-input');
            const registerForm = document.getElementById('register-form');
            const passwordInput = document.getElementById('password-input');
            const confirmPasswordInput = document.getElementById(
              'confirmPassword-input'
            );

            nameInput.value = user.displayName;
            emailInput.value = user.email;

            nameInput.readOnly = true;
            emailInput.readOnly = true;

            passwordInput.style.display = 'none';
            confirmPasswordInput.style.display = 'none';

            $.ajax({
              type: 'POST',
              mode: 'no-cors',
              url: 'http://localhost:3001/auth/fb-register',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              success: function (response) {
                console.log(response);
                if (response.success) {
                } else {
                  alert(response.message);
                }
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
                alert(`Error: ${errorThrown}`);
              },
            });
          })
          .catch(function (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
          });
      } else if (app && user && document.getElementById('google-sign-in')) {
        user
          .getIdToken()
          .then(function (token) {
            $.ajax({
              type: 'POST',
              mode: 'no-cors',
              url: 'http://localhost:3001/auth/fb-login',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              success: function (response) {
                console.log(response);
                if (response.success) {
                  location.href = '/dashboard';
                } else {
                  alert(response.message);
                }
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
                alert(`Error: ${errorThrown}`);
              },
            });
          })
          .catch(function (error) {
            console.error(error);
            alert(`Error: ${error.message}`);
          });
      } else if (!user) {
        $.ajax({
          type: 'POST',
          mode: 'no-cors',
          url: 'http://localhost:3001/auth/logout',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          success: function (response) {
            location.href = '/';
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error(errorThrown);
            alert(`Error: ${errorThrown}`);
          },
        });
      }
    });
  });

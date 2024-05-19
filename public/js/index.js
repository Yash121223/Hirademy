const modal = document.getElementById('profile-modal');
const profileLink = document.getElementById('profile-link');
const findlink = document.getElementById('find-link');
const closeButton = document.getElementsByClassName('close')[0];
const closeButton1 = document.getElementsByClassName('close1')[0];
const modal1 = document.getElementById('find-modal');

profileLink.addEventListener('click', function(event) {
  event.preventDefault(); 
  modal.style.display = 'block';
});

findlink.addEventListener('click', function(event) {
  event.preventDefault(); 
  modal1.style.display = 'block';
});

closeButton.addEventListener('click', function() {
  modal.style.display = 'none';
});

closeButton1.addEventListener('click', function() {
  modal1.style.display = 'none';
});

window.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

window.addEventListener('click', function(event) {
  if (event.target === modal1) {
    modal1.style.display = 'none';
  }
});

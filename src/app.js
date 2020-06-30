import { http } from './http';
import { ui } from './ui';

loadEventListers();

function loadEventListers() {
  //Get Post on DOM load
  document.addEventListener('DOMContentLoaded', getPosts);
  //Listen to add post
  document.querySelector('.post-submit').addEventListener('click', submitPost);
  //Listen to delete post
  document.querySelector('#posts').addEventListener('click', deletePost);
  //Listen to update post
  document.querySelector('#posts').addEventListener('click', enableEdit);
  //Listen to cancel Edit
  document.querySelector('.card-form').addEventListener('click', cancelEdit);
}

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then((data) => {
      data.reverse();
      ui.showPosts(data);
    })
    .catch((err) => console.log(err));
}

function submitPost() {
  const title = ui.titleInput.value;
  const body = ui.bodyInput.value;
  const id = ui.idInput.value;
  const data = {
    title,
    body,
  };
  if (title === '' || body === '') {
    ui.showAlert('Please fill all filled first', 'alert alert-danger');
  } else {
    if (id === '') {
      //create post
      http
        .post('http://localhost:3000/posts', data)
        .then((data) => {
          ui.showAlert('Post Added', 'alert alert-success');
          ui.clearFields();
          getPosts();
          // ui.post.scrollIntoView({ behavior: 'smooth', block: 'end' });
        })
        .catch((err) => console.log(err));
    } else {
      //update post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          ui.showAlert('Post Updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

function enableEdit(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const title = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const body = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body,
    };
    ui.fillForm(data);
  }
}

function deletePost(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert('Post Remove', 'alert alert-danger');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

function cancelEdit(e) {
  e.preventDefault();
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
}

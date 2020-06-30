class UI {
  constructor() {
    this.post = document.querySelector('#posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.top = document.querySelector('#top');
    this.forState = 'add';
  }

  showPosts(posts) {
    if (posts.length === 0) {
      this.post.innerHTML = '<h3>No Posts To show please add one..</h3>';
    } else {
      let output = '';
      posts.forEach((post) => {
        output += `
      <div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id="${post.id}">
          <i class="fa fa-pencil-square-o"></i>
          </a>
          <a href="#" class="delete card-link" data-id="${post.id}">
          <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
      });

      this.post.innerHTML = output;
    }
  }
  fillForm(postToBeEdit) {
    this.titleInput.value = postToBeEdit.title;
    this.bodyInput.value = postToBeEdit.body;
    this.idInput.value = postToBeEdit.id;
    this.changeFormState('edit');
  }
  clearIdInput() {
    this.idInput.value = '';
  }
  changeFormState(type) {
    if (type === 'edit') {
      this.top.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-block btn-warning';
      //remove if cancel-edit button alreay there
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      //creating cancel button
      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block';
      button.appendChild(document.createTextNode('Cancel Edit'));
      //get parent
      const cardForm = document.querySelector('.card-form');
      //get element to insert before
      const formEnd = document.querySelector('.form-end');
      //insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-block btn-primary';
      //remove if cancel-edit button alreay there
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      //clear id from hidden field
      this.clearIdInput();
      //clear input fields
      ui.clearFields();
    }
  }

  showAlert(message, className) {
    this.clearAlert();
    //creating the element
    const div = document.createElement('div');
    //adding the class
    div.classList = className;
    //adding the text
    div.appendChild(document.createTextNode(message));
    //geting the parent
    const container = document.querySelector('.postContainer');
    //getting the posts div
    const posts = document.querySelector('#posts');
    //inserting the alert
    container.insertBefore(div, posts);

    //timeout for alert

    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }
}

export const ui = new UI();

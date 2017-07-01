/* global $target */
/* eslint no-global-assign: 0*/
/* eslint no-alert: 0*/
/* eslint-env browser, jquery */

((axios) => {
  const deleteButton = document.querySelector('a.button.user-delete');

  const deleteUser = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    const confirmedDelete = confirm('Are you sure you want to delete this User?\nThis action can not be undone.');

    if (confirmedDelete) {
      axios.delete(`/users/${id}`)
        .then((response) => {
          window.location.href = '/';
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (deleteButton) {
    deleteButton.addEventListener('click', deleteUser, false);
  }
})(axios);


// jquery version
// $(document).ready(() => {
//   $('a.button.user-delete').on('click', (e) => {
//     $target = $(e.target);
//     const id = $target.attr('data-id');
//     const confirmedDelete = confirm('Are you sure you want to delete this User?\nThis action can not be undone.');

//     if (confirmedDelete) {
//       $.ajax({
//         type: 'DELETE',
//         url: `/users/${id}`,
//         success: (response) => {
//           window.location.href = '/';
//         },
//         error: (err) => {
//           console.log(err);
//         },
//       });
//     }
//   });
// });

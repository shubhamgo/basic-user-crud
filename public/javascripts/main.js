$(document).ready(() => {
  $('a.button.user-delete').on('click', (e) => {
    $target = $(e.target);
    const id = $target.attr('data-id');
    const confirmedDelete = confirm('Are you sure you want to delete this User?\nThis action can not be undone.');

    if (confirmedDelete) {
      $.ajax({
        type: 'DELETE',
        url: `/users/${id}`,
        success: (response) => {
          window.location.href = '/';
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

  });
});

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
  $(".remove-burgers").on("click", function () {
    var id = $(this).data("id");
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      location.reload();
    });
  });

  $(".change-burgers").on("click", function (event) {
    var id = $(this).data("id");

    var newBurgerState = {
      devour: 1,
    };

    // Send the PUT request.
    ///api/burgers/1
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: newBurgerState,
    }).then(function () {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".create-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger_name").val().trim(),
      devour: 0,
    };

    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger,
    }).then(function () {
      console.log("created new cat");
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".delete-burgers").on("click", function (event) {
    var id = $(this).data("id");

    // Send the DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE",
    }).then(function () {
      console.log("deleted burger", id);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});

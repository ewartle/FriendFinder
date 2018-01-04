$(document).ready(function() {

    $("#add-btn1").on("click", function(event) {
        event.preventDefault();
        $(".form").trigger("reset");
        var random;

        $.post("/api/random", random)
            .done(function(data) {

                var image = $("<img src = " + data.matchImage + " alt = 'picture of new friend'>");
                var results = ("Your new friend is " + data.matchName + ".  You took your chances, so no guarantee this is a match!");
                var space = $("<div> \n\n\n </div>");
                $("#myModal").modal();
                $(".modal-body").empty();
                $("#myModalLabel").empty();
                $("#myModalLabel").html("Your New Friend")
                $(".modal-body").append(results);
                $(".modal-body").append(space);
                $(".modal-body").append(image);

            });
    });

    $("#add-btn").on("click", function(event) {
        event.preventDefault();

        if ($("#name").val().trim() === "" || $("#link").val().trim() === "") {

            var required1 = true;

        }

        if ($("#answer1").val() === "" || $("#answer2").val() === "" || $("#answer3").val() === "" || $("#answer4").val() === "" || $("#answer5").val() === "" || $("#answer6").val() === "" || $("#answer7").val() === "" || $("#answer8").val() === "" || $("#answer9").val() === "" || $("#answer10").val() === "") {
            var required2 = true;
        }


        if (required1 || required2) {
            $("#myModal").modal();
            $(".modal-body").empty();
            $("#myModalLabel").empty();
            $(".modal-body").append("If you want to see your match, you must answer every question!   Otherwise, click the 'Forget the survey' button below.");

        } else {

            var surveyData = {
                name: $("#name").val().trim(),
                photo: $("#link").val().trim(),
                scores: [parseFloat($("#answer1").val().trim()),
                    parseFloat($("#answer2").val().trim()), parseFloat($("#answer3").val().trim()), parseFloat($("#answer4").val().trim()), parseFloat($("#answer5").val().trim()), parseFloat($("#answer6").val().trim()), parseFloat($("#answer7").val().trim()), parseFloat($("#answer8").val().trim()), parseFloat($("#answer9").val().trim()), parseFloat($("#answer10").val().trim())
                ]
            };

            $.post("/api/friends", surveyData)
                .done(function(data) {
                    console.log(data);
                    console.log(data.matchName);
                    console.log(data.matchImage);
                    var image = $("<img src = " + data.matchImage + " alt = 'picture of new friend'>");
                    var results = ("Your new friend is " + data.matchName + ".");
                    var space = $("<div> \n\n\n </div>");

                    $("#myModal").modal();
                    $(".modal-body").empty();
                    $("#myModalLabel").empty();
                    $("#myModalLabel").html("Your Best Match");
                    $(".modal-body").append(results);
                    $(".modal-body").append(space);
                    $(".modal-body").append(image);
                    $(".form").trigger("reset");

                });
        }
    });
});
function simplifyResponseHandler(data) {
            var $paymentForm = $("#simplify-payment-form");
            // Remove all previous errors
            $(".error").remove();
            // Check for errors
            if (data.error) {
                // Show any validation errors
                if (data.error.code == "validation") {
                    var fieldErrors = data.error.fieldErrors,
                            fieldErrorsLength = fieldErrors.length,
                            errorList = "";
                    for (var i = 0; i < fieldErrorsLength; i++) {
                        errorList += "<div class='error'>Field: '" + fieldErrors[i].field +
                                "' is invalid - " + fieldErrors[i].message + "</div>";
                    }
                    // Display the errors
                    $paymentForm.after(errorList);
                }
                // Re-enable the submit button
                $("#process-payment-btn").removeAttr("disabled");
            } else {
                // The token contains id, last4, and card type
                var token = data["id"];
                // Insert the token into the form so it gets submitted to the server
                $paymentForm.append("<input type='hidden' name='simplifyToken' value='" + token + "' />");
                // Submit the form to the server
                //$paymentForm.get(0).submit();
            }
        }
        $(document).ready(function() {
            $("#simplify-payment-form").on("submit", function(e) {
                // Disable the submit button
                $("#process-payment-btn").attr("disabled", "disabled");
                e.preventDefault()
                // Generate a card token & handle the response
                SimplifyCommerce.generateToken({
                    key: "sbpb_Yzg0ZTViMmItNTU3Mi00ZDc5LTgyZDctOTVlZDNmNTk0MDAx",
                    card: {
                        number: $("#cc-number").val(),
                        cvc: $("#cc-cvc").val(),
                        expMonth: $("#cc-exp-month").val(),
                        expYear: $("#cc-exp-year").val()
                    }
                }, simplifyResponseHandler);
                // Prevent the form from submitting
                return false;
            });
        });

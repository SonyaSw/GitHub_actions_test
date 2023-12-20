$(function(){

    let statusName = false;
    $("#registration-form-name").on("blur", function(){
        statusName = checkName($(this).val());
    });
    let statusPhone = false;
    $("#registration-form-phone").on("blur", function(){
        statusPhone = checkPhone($(this).val());
    });
    let statusEmail = false;
    $("#registration-form-email").on("blur", function(){
        statusEmail = checkEmail($(this).val());
    });
    let statusCity = false;
    $("#registration-form-city").on("blur", function(){
        statusCity = checkCity($(this).val());
    });
    let statusPassword1 = false;
    $("#registration-form-password-1").on("blur", function(){
        statusPassword1 = checkPassword1($(this).val());
    });
    let statusPassword2 = false;
    $("#registration-form-password-2").on("blur", function(){
        statusPassword2 = checkPassword2($("#registration-form-password-1").val(), $(this).val());
    });

    $("#registration-form-send").on("click", function(){
        registerUser(statusName, statusPhone, statusEmail, statusCity, statusPassword1, statusPassword2);
    });


});
function checkName(name)
{
    let regex = /^[a-z\s]{2,25}$/i;
    let status = false;
    if (name.match(regex) != null)
    {
        status = true;
        $("#registration-form-name-error").text("");
    }
    else
    {
        status = false;
        $("#registration-form-name-error").text("Name entered incorrectly");
    }
    return status;
}
function checkPhone(phone)
{
    let regex = /^\+38\d{10}$/;
    let status = false;
    if (phone.match(regex) != null)
    {
        status = true;
        $("#registration-form-phone-error").text("");
    }
    else
    {
        status = false;
        $("#registration-form-phone-error").text("Phone entered incorrectly");
    }
    return status;
}
function checkEmail(email)
{
    let regex = /^[a-zA-Z0-9\.]{4,17}@gmail.com$/;
    let status = false;
    if(email.match(regex) != null)
    {
        status = true;
        $("#registration-form-email-error").text("");
    }
    else
    {
        status = false;
        $("#registration-form-email-error").text("Email entered incorrectly");
    }
    return status;
}
function checkCity(city)
{
    let regex = /^[a-z\s]{2,25}$/i;
    let status = false;
    if (city.match(regex) != null)
    {
        status = true;
        $("#registration-form-city-error").text("");
    }
    else
    {
        status = false;
        $("#registration-form-city-error").text("City name entered incorrectly");
    }
    return status;
}
function checkPassword1(password1)
{
    let regex = /^[a-z0-9]{8,16}$/i;
    let status = false;
    if(password1.match(regex) != null)
    {
        status = true;
        $("#registration-form-password-1-error").text("");
    }
    else
    {
        status = false;
        $("#registration-form-password-1-error").text("Password entered incorrectly");
    }
    return status;
}
function checkPassword2(password1, password2)
{
    let status = false;
    if(password1 == password2)
    {
        status = true;
        $("#registration-form-password-2-error").text("");
    }
    else
    {
        status = false;
        $("#registration-form-password-2-error").text("Passwords dont match");
    }
    return status;

}
function registerUser(statusName, statusPhone, statusEmail, statusCity, statusPassword1, statusPassword2)
{
    let registerResult = false;
    //console.log("Name:" + statusName + ", phone: " + statusPhone + ", email: " + statusEmail + ", city: " + statusCity + ", password1: " + statusPassword1 + ", password2: " + statusPassword2);
    if(statusName && statusPhone && statusEmail && statusCity && statusPassword1 && statusPassword2)
    {
        let registerData = $("#registration-form").serializeArray();
        //console.log(registerData);
        $.post("http://localhost/WeatherWise/Server/registerUser.php", registerData, function(result){
            if(result.status != "fail")
            {
                console.log(result);
                registerResult = true;
            }
            console.log(result.message);
        }, "JSON");
    }
    return registerResult;   
}
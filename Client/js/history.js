$(function(){
    showHistory();

    $("#history-table-body").on("click", ".delete-reading-button", function(){
        deleteReading(parseInt($(this).attr("id")));
    });
});
function showHistory()
{
    //console.log("JS");
    $.getJSON("../../Server/history.php", "mode=show-history", function(result){
        $("#history-table-body").empty();
        console.log(result);
        if(result.readings.length > 0)
        {
            $.each(result.readings, function(){
                console.log(this.id);
                $("#history-table-body").append(
                    "<tr><td>"+this.id+"</td><td>"+this.city+"</td><td>"+convertSQLDateOutput(this.date)+"</td><td>"+this.temperature+" &#8451;</td><td>"+this.description+"</td><td><img src='"+this.icon+"' width='50px'></td><td>"+this.windspeed+"km/h</td><td>"+this.humidity+"%</td><td><button type='button' id='"+this.id+"-delete-reading-button' class='delete-reading-button' data-reading-id='"+this.id+"'>Delete</button></td></tr>"
                );
            });
            $("#history-table-body").append("<tr></tr>");
        }
    });
}
function convertSQLDateOutput(date){
    return date.split("-").reverse().join("/");
}
function deleteReading(id){
    //console.log(id);
    $.post("../../Server/history.php", "mode=delete-reading&id="+id, function(result){
        console.log(result.message);
        if(result.status == "success")
        {
            showHistory();
        }
    }, "JSON");
}

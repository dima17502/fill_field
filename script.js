/*
    TODO
    поле


*/

var game_field_size = 500;


function main()
{
    set_body();
    create_game_field();
    create_info_field();

}

function set_body()
{
    document.body.background = "url('images/back.jpg')";

}
function create_game_field()
{
    elem = document.createElement("div");
    elem.id = "gameField";
    elem.style.position = "absolute";
    elem.style.width = game_field_size + "px";
    elem.style.height = game_field_size + "px";
    //elem.style.marginLeft = "600px";
    elem.style.marginTop = "50px";
    elem.style.border = "3px solid black";
    document.body.appendChild(elem);
}
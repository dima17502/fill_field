/*
    TODO
    поле


*/

var game_field_size = 600;
var vk_width = 1000;
var vk_height = 750;

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
    eframe = document.createElement("div");
    eframe.id = "window";
    eframe.position = "absolute";
    eframe.style.border = "1px solid red";
    eframe.style.width = vk_width + "px";
    eframe.style.height = vk_height + "px";
    document.body.appendChild(eframe);
    elem = document.createElement("div");
    elem.id = "gameField";
    elem.style.position = "absolute";
    elem.style.width = game_field_size + "px";
    elem.style.height = game_field_size + "px";
    elem.style.marginLeft = "10%";
    elem.style.marginTop = "50px";
    elem.style.border = "3px solid black";
    elem.style.background = "black";
    eframe.appendChild(elem);
}
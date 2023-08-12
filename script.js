/*
    TODO
    поле


*/

var game_field_size = 600;
var vk_width = 900;
var vk_height = 750;
var cell_size = 40;
var colors = ["#d22","#3d3","blue","#aaa","yellow","purple"];
var color_list = [];
var salt = new Date();
var user_area = [1];
var area_color = "";
var max_attempts = 25;
var user_attempt = 1;
var cells_in_row = parseInt(game_field_size /cell_size);
var cells_in_field = cells_in_row * cells_in_row;


function main()
{
    set_body();
    create_game_field();
    create_info_field();
    create_attempts_bar();
}

function set_body()
{
    //document.body.style.fontSize = 0;
    eframe = document.createElement("div");
    eframe.id = "window";
    eframe.position = "absolute";
    eframe.style.border = "1px solid red";
    eframe.style.width = vk_width + "px";
    eframe.style.height = vk_height + "px";
    document.body.appendChild(eframe);
    eframe.style.background = "url('back.jpg')";

}
function create_game_field()
{
    
    elem = document.createElement("div");
    elem.id = "gameField";
    elem.style.position = "absolute";
    elem.style.width = game_field_size + "px";
    elem.style.height = game_field_size + "px";
    elem.style.marginLeft = "15%";
    elem.style.marginTop = "50px";
    //elem.style.border = "3px solid black";
    elem.style.background = "black";
    elem.style.display = "block";
    elem.onclick = cell_chosen;
    elem.style.fontSize = 0;
    elem.style.border = "1px solid black";
    for(var i = 0; i < cells_in_field; i++)
    {
        cell = document.createElement("div");
        cell.id = i + 1;
        cell.style.display = "inline-block";
        cell.style.border = "0px";
        cell.style.margin = "0";
        //cell.style.position = "absolute";
        cell.style.minWidth = cell_size + "px";
        cell.style.height = cell_size + "px";
        cell.style.background = colors[parseInt(Math.random()*1000*(salt%119))%colors.length];
        elem.appendChild(cell);
    }
  
    eframe.appendChild(elem);
    el1 = document.getElementById(1);
    area_color = el1.style.background;
}

function cell_chosen(event)
{

    cell = document.elementFromPoint(event.x, event.y);
    area_color = cell.style.background;
    paint_area();
    update_area();
    if(user_area.length >= cells_in_field)
        alert("Получилось!");
    user_attempt += 1;
    if(user_attempt > max_attempts)
        alert("Попытки закончились. Пробуем еще?");
    update_attempts();
   
}


function update_area()
{
    for(var i = 1; i <= cells_in_field; i++)
    {
        var should_add = false;
        cell = document.getElementById(i);
        if(cell.style.background == area_color && (exist_in_area(i) == false))
        {
            if(i > cells_in_row && exist_in_area(i - cells_in_row))
                should_add = true;
            else if(i + cells_in_row <= cells_in_field && exist_in_area(i + cells_in_row))
                should_add = true;
            else if(i % cells_in_row != 1 && exist_in_area(i - 1))
                should_add = true;
            else if(i % cells_in_row != 0 && exist_in_area(i + 1))
                should_add = true;
        }
        if(should_add)
            user_area.push(i);
    }
    

}

function exist_in_area(elem)
{
    for(var i = 0; i < user_area.length; i++)
    {
        if(user_area[i] == elem)
            return true;
    }
    return false;
}
function paint_area()
{
    for(var i = 0; i < user_area.length; i++)
    {
        cell = document.getElementById(user_area[i]);
        cell.style.background = area_color;
    }

}

function create_info_field()
{
    einfo = document.createElement("div");
    einfo.id = "infoField";
    einfo.style.position = "absolute";
    einfo.style.marginTop = "15%";
    einfo.style.height = "auto";
    einfo.style.border = "1px solid white";
    einfo.style.width = "10%";
    einfo.style.fontSize = "1em";
    einfo.style.fontFamily = "Open Sans";
    einfo.style.color = "white";
   // einfo.style.background = "white";
    einfo.style.marginLeft = "10px";
    einfo.innerText = "Цель игры - заполнить всё поле одним цветом, продвигаясь из левого верхнего угла. \nДля этого нужно выбирать прилегающий к занятой области цвет, кликая на него. \nКоличество ходов ограничено.";
    einfo.style.padding = "5px";
    w = document.getElementById("window");
    w.appendChild(einfo);
    
  
}

function create_attempts_bar()
{
    elem = document.createElement("div");
    elem.id = "attemptsBar";
    elem.style.position = "absolute";
    elem.innerText = "Попытка\n"+user_attempt+"/"+max_attempts;
    elem.style.marginTop = "5%";
    elem.style.marginLeft = "20px";
    
    elem.style.color = "white";

    elem.style.border = "1px solid white";
    elem.style.width = "auto";
    elem.style.padding = "5px";
    elem.style.height = "auto";
    elem.style.textAlign = "center";
    elem.style.fontSize = "2em";
    w = document.getElementById("window");
    w.appendChild(elem);
}



function update_attempts()
{
    elem = document.getElementById("attemptsBar");
    elem.innerText = "Попытка\n"+user_attempt+"/"+max_attempts;
}
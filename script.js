/*
    TODO
    поле


*/

var game_field_size = 600;
var vk_width = 900;
var vk_height = 750;
var cell_size = 40;
var colors = ["#d22","#3d3","blue","#aaa","yellow","purple"];
var salt = new Date();
var user_area = [1];
var area_color = "";
var max_attempts = 25;
var user_attempt = 1;
var cells_in_row = parseInt(game_field_size /cell_size);
var cells_in_field = cells_in_row * cells_in_row;
var game_result = 0;
var game_status = 1;
var times_played = 0;



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
    elem.style.marginLeft = "250px";
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
    update_area();
}

function generate_field()
{
    salt = new Date();
    for(var i = 0; i < cells_in_field; i++)
    {
        cell = document.getElementById(i + 1);
        cell.style.background = colors[parseInt(Math.random()*1000*(salt%119))%colors.length];
    }
}

function cell_chosen(event)
{
    if(game_status)
    {
        cell = document.elementFromPoint(event.x, event.y);
        area_color = cell.style.background;
        paint_area();
        update_area();
        if(user_area.length >= cells_in_field || user_attempt >= max_attempts)
        {
       // alert(user_attempt);
            game_status = 0;
            if(user_attempt >= max_attempts)
                game_result = 0;
            else
                game_result = 1;
            if(times_played == 0)
                create_resultBar();
            else
                display_resultBar();
        }
        user_attempt += 1;
        update_attempts();
    }
}

function create_resultBar()
{
    rb = document.createElement("div");
    rb.id="resultBar";
    rb.style.position = "absolute";
    rb.style.width = "auto";
    rb.style.height = "auto";
    rb.style.marginLeft = "320px";
    rb.style.fontSize = "2em";
    rb.style.marginTop = "280px";
    rb.style.padding = "20px";
    rb.style.border = "3px solid black";
    rb.style.fontFamily = "Open Sans";
    if(game_result)
        rb.innerText = "Получилось! Еще раз?\n";
    else
        rb.innerText = "Не вышло... Пробуем ещё?\n";
    rb.style.background = "white";
    yeslem = document.createElement("div");
    yeslem.id = "yesBtn";
    yeslem.style.position = "relative";
    yeslem.innerText = "Да";
    yeslem.style.marginTop = "10px";
    yeslem.style.background = "#3c3";
    yeslem.style.width = "auto";
    yeslem.style.display = "inline-block";
    yeslem.style.height = "auto";
    yeslem.style.marginLeft = "10%";
    yeslem.style.padding = "5px 20px";
    yeslem.onmouseover = mouse_over_choice;
    yeslem.onmouseout = mouse_out_choice;
    yeslem.onclick = restart;
    yeslem.style.border = "2px solid black";
    rb.appendChild(yeslem);
    
    surelem = document.createElement("div");
    surelem.id = "sureBtn";
    surelem.style.display = "inline-block";
    surelem.style.position = "relative";
    surelem.innerText = "Конечно!";
    surelem.style.background = "#77c";
    surelem.style.width = "auto";
    surelem.style.height = "auto";
    surelem.style.float = "right";
    surelem.style.marginRight = "10%";
    surelem.style.marginTop = "10px";
    surelem.onmouseover = mouse_over_choice;
    surelem.onmouseout = mouse_out_choice;
    surelem.style.border = "2px solid black";
    surelem.style.padding = "5px 10px";
    surelem.onclick = restart;
    rb.appendChild(surelem);

    w = document.getElementById("window");
    w.appendChild(rb);
}

function display_resultBar()
{
    rb = document.getElementById("resultBar");
    rb.style.display = "block";
}

function mouse_over_choice(event)
{
    ch = document.elementFromPoint(event.x, event.y);
    ch.style.cursor = "pointer";
    ch.style.background = "black";
    ch.style.color = "white";
}

function mouse_out_choice()
{
    yesb = document.getElementById("yesBtn");
    yesb.style.cursor = "default";
    sureb = document.getElementById("sureBtn");
    sureb.style.cursor = "default";
    yesb.style.background = "#3c3";
    yesb.style.color = "black";
    sureb.style.background = "#77c";
    sureb.style.color = "black";
    
}

function restart(event)
{
    ch = document.elementFromPoint(event.x, event.y);
    ch.style.cursor = "default";
    resbar = document.getElementById("resultBar");
    resbar.style.display = "none";
    times_played += 1;
    if(times_played % 2 == 0)
        show_add();
    generate_field();
    el1 = document.getElementById(1);
    area_color = el1.style.background;
    user_area = [1];
    user_attempt = 1;
    update_attempts();
    update_area();
    game_status = 1;
}

function show_add()
{
    alert("Показываю рекламу$$$");
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
    einfo.style.width = "200px";
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
    elem.innerText = "Ход\n"+user_attempt+"/"+max_attempts;
    elem.style.marginTop = "5%";
    elem.style.marginLeft = "70px";
    
    elem.style.color = "white";

    elem.style.border = "1px solid white";
    elem.style.width = "auto";
    elem.style.padding = "5px 20px";
    elem.style.height = "auto";
    elem.style.textAlign = "center";
    elem.style.fontSize = "2em";
    w = document.getElementById("window");
    w.appendChild(elem);
}



function update_attempts()
{
    elem = document.getElementById("attemptsBar");
    elem.innerText = "Ход\n"+user_attempt+"/"+max_attempts;
}
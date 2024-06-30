execute if score @s steps matches 1.. run tp @s ~~-0.5~
execute if score @s steps matches ..0 run event entity @s pinatabedrock:delete

scoreboard players remove @s steps 1

execute if block ~~~ water run scoreboard players add @e[family=garden, r=30] water 1
execute if block ~~~ water run event entity @s pinatabedrock:delete

execute if block ~~~ sand run scoreboard players add @e[family=garden, r=30] sand 1
execute if block ~~~ sand run event entity @s pinatabedrock:delete

execute if block ~~~ snow run scoreboard players add @e[family=garden, r=30] snow 1
execute if block ~~~ snow run event entity @s pinatabedrock:delete

execute if block ~~~ grass run scoreboard players add @e[family=garden, r=30] grass 1
execute if block ~~~ grass run event entity @s pinatabedrock:delete

execute if block ~~~ dirt run scoreboard players add @e[family=garden, r=30] soil 1
execute if block ~~~ dirt run event entity @s pinatabedrock:delete

execute if block ~~~ pinatabedrock:poppy ["pinatabedrock:growth_stage"=2, "pinatabedrock:fertilizer"=0] run scoreboard players add @e[family=garden, r=30] poppy 1
execute if block ~~~ pinatabedrock:poppy ["pinatabedrock:growth_stage"=2, "pinatabedrock:fertilizer"=0] run event entity @s pinatabedrock:delete

execute if block ~~~ pinatabedrock:poppy ["pinatabedrock:growth_stage"=2, "pinatabedrock:fertilizer"=1] run scoreboard players add @e[family=garden, r=30] poppy 2
execute if block ~~~ pinatabedrock:poppy ["pinatabedrock:growth_stage"=2, "pinatabedrock:fertilizer"=1] run event entity @s pinatabedrock:delete

execute if block ~~~ pinatabedrock:poppy ["pinatabedrock:growth_stage"=2, "pinatabedrock:fertilizer"=2] run scoreboard players add @e[family=garden, r=30] poppy 3
execute if block ~~~ pinatabedrock:poppy ["pinatabedrock:growth_stage"=2, "pinatabedrock:fertilizer"=2] run event entity @s pinatabedrock:delete

execute if block ~~~ pinatabedrock:poppy ["pinatabedrock:growth_stage"=2, "pinatabedrock:fertilizer"=3] run scoreboard players add @e[family=garden, r=30] poppy 4
execute if block ~~~ pinatabedrock:poppy ["pinatabedrock:growth_stage"=2, "pinatabedrock:fertilizer"=3] run event entity @s pinatabedrock:delete

execute unless block ~~~ air run event entity @s pinatabedrock:delete
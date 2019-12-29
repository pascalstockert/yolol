# Yolol examples

## Increment
```//basic stuff:
i=1
i=i+3 // => i=4
//it is same as:
i=1
i+=3 // => i=4
number=10
number=number-5 // => number=5
//it is same as:
number=10
number-=5 // => number=5
// r++ adds 1 to number
r=2
r++ // => r=3
//it is same as:
r=2
r+=1 // => r=3
//or
r=2
r=r+1 // => r=3
```

example1:
```
//where to use i++
whatismyline=2
whatismyline++ // => 3
whatismyline++ // => 4
whatismyline++ // => 5
whatismyline++ // => 6
whatismyline++ // => 7
whatismyline++ // => 8
whatismyline++ // => 9
```
example2:
```
i=1
i++ goto 3
```

## Goto


```
mytext="hello"
mytext+=" there"
mytext+=" ."
mytext+="what "
mytext+="are"
mytext+=" you"
mytext+=" doing"
mytext+="?" 

myanswer="" goto 16

myanswer+=" programming" goto 20
myanswer+=","
myanswer+=" i'm" goto 13
myanswer+="hey" goto 14



goto 1
```
## Bigger example 1
increase 0 -> 30
```
number=0
if number!=30 then number++ goto 2 end
```
decrease 30 -> 0 
```
number=30
if number!=0 then number-- goto 2 end
```
compine increase and decrease 0-> 30 -> 0

```
number=0
if number!=30 then number++ goto 2 end
if number!=0 then number-- goto 3 end
goto 1
```

## Fuel usage example
lets make fuel usage emulator. Fueltank got 500 units fuel and our motor uses at 1% fuel 0.05 units
Core would be something like this:
```
fuel=500 //fueltank have "units"
power=0 //0-100%
motor=0.05 //how much fuel used with 1%
//use all fuel with 100% power
power=100
if fuel>0 then fuel-=power*motor goto 6 end
```
scenario 1:
Show as text and % how much i have fuel

code:

```
fuel=500 fuelsize=500 //fueltank have "units"
power=0 //0-100%
motor=0.25 //how much fuel used with 1%

if fuel>0 then goto 6 else goto 20 end
power=100
fuelpct=(fuel/fuelsize)*100
fueltankstatus="fuel tank is "+fuelpct+"%"
fuel-=power*motor goto 5
```

scenario 2:

```
if fueltank is 100-50% full use 100% power
if fueltank is 50-10% full use 70% power
if fueltank is 10-0% full use 15% power
```

code:

```
fuel=500 fuelsize=500 //fueltank have "units"
power=0 //0-100%
motor=0.25 //how much fuel used with 1%

if fuel>0 then goto 6 else goto 20 end
fuelpct=(fuel/fuelsize)*100
if fuelpct>50 then power=100 goto 10 end
if fuelpct>10 then power=70 goto 10 end
if fuelpct<10 then power=15 end
fuel-=power*motor goto 5
```



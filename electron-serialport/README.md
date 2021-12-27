# The application

### Head line of the application

This application is a deskstop application that control the control box, and give to it many data like : colors, opacity, etc.
With this application we can set up 3 differents modes with personalize colors for each one. At each mode we can give **R**ed, **G**reen and **B**lue value, to have customize colors. We can even change the opacity of the strip led.

![image](https://user-images.githubusercontent.com/52750644/147503219-aa6bd22c-f056-4011-9a28-40a04f033e39.png)

To finish we can select the port with that we will communicate, this port is where the microcontroller is connected.

![image](https://user-images.githubusercontent.com/52750644/147502709-b9446ca0-7fa8-44a9-bbd4-eba127c37fe1.png)
![image](https://user-images.githubusercontent.com/52750644/147502719-33e90c0e-0778-4c5a-ad64-ecb64fc7caab.png)

### How it work ? 
The application send this type of data through the serial port, to communicate with the microcontroller.
```json
{
  "TITLE": "COLOR",
  "MODE": 1,
  "RED": "REDslider_Value1",
  "GREEN": "Greenslider_Value1",
  "BLUE": "Blueslider_Value1"
}
```
### The result

<img src="https://user-images.githubusercontent.com/52750644/147503260-bebd6e38-8109-4f80-a496-88a59fb7e1ca.png" width="60%">

<hr>

Copyright © 2021 @lucas-science

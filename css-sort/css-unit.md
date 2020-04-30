## CSS Unit

### Absolute Lengths

| **Unit** | **Description**              |
| :------: | ---------------------------- |
|    cm    | centimetres                  |
|    mm    | millimetres                  |
|    in    | inches (1in = 96px = 2.54cm) |
|   px*    | pixels (1px = 1/96th of 1in) |
|    pt    | points (1pt = 1/72 of 1in)   |
|    pc    | picas (1pc = 12 pt)          |



### Relative Lengths

| **Unit** | **Description**                                              |
| :------: | :----------------------------------------------------------- |
|    em    | Relative to the font-size of the element (2em means 2 times the  size of the current font) |
|    ex    | Relative to the x-height of the current font (rarely used)   |
|    ch    | Relative to width of the "0" (zero)                          |
|   rem    | Relative to font-size of the root element                    |
|    vw    | Relative to 1% of the width of the viewport*                 |
|    vh    | Relative to 1% of the height of the viewport*                |
|   vmin   | Relative to 1% of viewport's* smaller dimension              |
|   vmax   | Relative to 1% of viewport's* larger dimension               |
|    %     | Relative to the parent element                               |



|            Length Unit            | Chrome | Edge | Firefox | Safari | Opera |
| :-------------------------------: | :----: | :--: | :-----: | :----: | :---: |
| em, ex, %, px, cm, mm, in, pt, pc |  1.0   | 3.0  |   1.0   |  1.0   |  3.5  |
|                ch                 |  27.0  | 9.0  |   1.0   |  7.0   | 20.0  |
|                rem                |  4.0   | 9.0  |   3.6   |  4.1   | 11.6  |
|              vh, vw               |  20.0  | 9.0  |  19.0   |  6.0   | 20.0  |
|               vmin                |  20.0  | 12.0 |  19.0   |  6.0   | 20.0  |
|               vmax                |  26.0  | 16.0 |  19.0   |  7.0   | 20.0  |
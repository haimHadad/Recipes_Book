
import {trigger, state, style, transition, animate, group, keyframes} from '@angular/animations';



export let confirmMsgSaveError =

trigger('confirmation', [

  transition('void => *', [
    animate(300,keyframes([
      style({
        transform: 'translateY(-20px)',
        opacity:0,
        offset:0
      }),
      style({
        transform: 'translateY(-10px)',
        opacity:0.5,
        offset:0.3
      }),
      style({
        transform: 'translateY(-5px)',
        opacity:1,
        offset:0.8
      }),
      style({
        transform: 'translateY(0px)',
        opacity:1,
        offset:1
      })
    ]))
  ]),

  transition('* => void', [
    group([
      animate(200,
        style({
          color: 'gray',
        })),
      animate(200,
      style({
        transform: 'translateY(-20px)',
        opacity:0
      }))
    ])

  ])
]);

export let recipeListEnterLeave =

trigger('recipesList', [


  transition('void => *', [
    animate(150,keyframes([
      style({
        transform: 'translateX(-50px)',
        opacity:0,
        offset:0
      }),
      style({
        transform: 'translateX(-35px)',
        opacity:0.5,
        offset:0.3
      }),
      style({
        transform: 'translateX(-10px)',
        opacity:1,
        offset:0.8
      }),
      style({
        transform: 'translateX(0px)',
        opacity:1,
        offset:1
      })
    ]))
  ]),

  transition('* => void', [
    group([
      animate(150,
        style({
          color: 'gray',
        })),
      animate(200,
      style({
        transform: 'translateX(100px)',
        opacity:0
      }))
    ])

  ])
])

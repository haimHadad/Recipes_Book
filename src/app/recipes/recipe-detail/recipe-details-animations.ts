import {trigger, state, style, transition, animate, group, keyframes} from '@angular/animations';


export let detailsEnter =

trigger('ShowDetails', [

  transition('void => *', [
    animate(150,keyframes([
      style({
        transform: 'translateX(100px)',
        opacity:0,
        offset:0
      }),
      style({
        transform: 'translateX(75px)',
        opacity:0.2,
        offset:0.1
      }),
      style({
        transform: 'translateX(50px)',
        opacity:0.5,
        offset:0.4
      }),
      style({
        transform: 'translateX(25px)',
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
      animate(250,
        style({
          color: 'gray',
        })),
      animate(800,
      style({
        transform: 'translateX(50px)',
        opacity:0
      }))
    ])

  ])
]);

export let msgIngrediantToSL =

trigger('confirmation', [


  transition('void => *', [
    animate(250,keyframes([
      style({
        transform: 'translateX(40px)',
        opacity:0,
        offset:0
      }),
      style({
        transform: 'translateX(30px)',
        opacity:0.2,
        offset:0.1
      }),
      style({
        transform: 'translateX(20px)',
        opacity:0.5,
        offset:0.4
      }),
      style({
        transform: 'translateX(10px)',
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
      animate(250,
        style({
          color: 'gray',
        })),
      animate(400,
      style({
        transform: 'translateX(50px)',
        opacity:0
      }))
    ])

  ])
])

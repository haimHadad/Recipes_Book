import {trigger, state, style, transition, animate, group, keyframes} from '@angular/animations';



export let editDetailsEnter =
trigger('showingUp', [
  state('normal', style({
    opacity:1,
    transform: 'translateX(0)'
  })),

  transition('void => *', [
    animate(250,keyframes([
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
      animate(300,
        style({
          color: 'gray',
        })),
      animate(300,
      style({
        transform: 'translateX(50px)',
        opacity:0
      }))
    ])

  ])
]);

export let ingrediantManage =
trigger('ingrediantEdit', [
  state('normal', style({
    opacity:1,
    transform: 'translateX(0)'
  })),

  transition('void => *', [
    animate(250,keyframes([
      style({
        transform: 'translateX(35px)',
        opacity:0.25,
        offset:0.25
      }),
      style({
        transform: 'translateX(25px)',
        opacity:0.55,
        offset:0.55
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
      animate(200,
        style({
          color: 'red',
        })),
      animate(200,
      style({
        transform: 'translateX(50px)',
        opacity:0
      }))
    ])

  ])
])

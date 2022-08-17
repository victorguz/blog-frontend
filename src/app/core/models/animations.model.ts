import { animate, style, transition, trigger } from '@angular/animations';

export class Animations {

  public static hidenHeightAnimation(seconds: number = 0.2) {
    return trigger(
      'hidenHeightAnimation',
      [
        transition(
          ':enter',
          [
            style({ transition: `all ${seconds}s ease-in`, height: 0 }),
            animate(`${seconds}s ease-out`,
              style({ transition: `all ${seconds}s ease-in`, height: "fit-content" }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ transition: `all ${seconds}s ease-in`, height: "fit-content" }),
            animate(`${seconds}s ease-out`,
              style({ transition: `all ${seconds}s ease-in`, height: 0 }))
          ]
        )
      ]
    )
  }

  public static opacityAnimation(seconds: number = 0.2) {
    return trigger(
      'opacityAnimation',
      [
        transition(
          ':enter',
          [
            style({ transition: `all ${seconds}s ease-in`, opacity: 0 }),
            animate('0.2s ease-out',
              style({ transition: `all ${seconds}s ease-in`, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ transition: `all ${seconds}s ease-in`, opacity: 1 }),
            animate(`${seconds}s ease-out`,
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  }
}

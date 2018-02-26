import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'pizza-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'pizza-item.component.html',
  styleUrls: ['pizza-item.component.scss']
})
export class PizzaItemComponent {
  @Input() pizza: any;
}

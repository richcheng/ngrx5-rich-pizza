import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Topping } from '../../models/topping.model';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PizzaToppingsComponent),
  multi: true
};

@Component({
  selector: 'pizza-toppings',
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'pizza-toppings.component.html',
  styleUrls: ['pizza-toppings.component.scss']
})
export class PizzaToppingsComponent implements ControlValueAccessor {
  @Input() toppings: Topping[] = [];

  value: Topping[] = [];

  private onTouch: Function;
  private onModelChange: Function;

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: Topping[]) {
    this.value = value;
  }

  selectTopping(topping: Topping) {
    if (this.existsInToppings(topping)) {
      this.value = this.value.filter(item => item.id !== topping.id);
    } else {
      this.value = [...this.value, topping];
    }
    this.onTouch();
    this.onModelChange(this.value);
  }

  existsInToppings(topping: Topping) {
    return this.value.some(val => val.id === topping.id);
  }
}

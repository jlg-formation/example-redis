import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

type PasswordState = 'password' | 'text';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent implements ControlValueAccessor {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  onChange: any = () => {};

  onTouched: any = () => {};

  state: PasswordState = 'password';
  value = '';

  constructor() {}

  registerOnChange(fn: any): void {
    this.onChange = (...args: any[]) => {
      return fn(...args);
    };
  }

  registerOnTouched(fn: any): void {
    this.onTouched = (...args: any[]) => {
      return fn(...args);
    };
  }

  writeValue(value: string): void {
    this.value = value;
  }

  toggle() {
    this.state = this.state === 'password' ? 'text' : 'password';
  }
}

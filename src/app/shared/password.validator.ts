import { AbstractControl } from '@angular/forms';

export function passwordValidator(control:AbstractControl): {[key: string]: boolean} | null {
    const password = control.get('password');
    const cpassword = control.get('cpassword');
    return password && cpassword && password.value !== cpassword.value ? {misMatch: true} : null;
}
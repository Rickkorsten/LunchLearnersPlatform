import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/core/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

type UserFields = 'email' | 'password';
type FormErrors = {[u in UserFields]: string };

// info you want from firebase object
interface Company {
  name: string;
  code: string;
  uid: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  // firebase collection
  companiesCol: AngularFirestoreCollection<Company>;
  companies: Observable<Company[]>;
  // company info received
  companyUID: string;
  companyName: string;
  companyCode: string;

  // userform
  userForm: FormGroup;
  newUser = false; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  // form errors
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };


  validationMessages = {
    'email': {
      'required': 'Email is verplicht.',
      'email': 'Dit is geen email adress.',
    },
    'password': {
      'required': 'Wschtwoord is verplicht.',
      'pattern': 'Wachtwoord moet een letter en een nummer hebben.',
      'minlength': 'Wachtwoord moet minstend 4 caracters lang zijn.',
      'maxlength': 'Wachtwoord kan niet meer dan 40 caracters bevatten.',
    },
  };

  constructor(private db: AngularFirestore, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  toggleForm() {
    this.newUser = !this.newUser;
  }

  signup() {
    const email: string = this.userForm.value['email'];
    const password: string = this.userForm.value['password'];
    const suffix: string = this.getEmailSuffix(email);

    this.companiesCol = this.db.collection('companies', ref => ref.where('emailsuffix', '==', suffix));
    this.companies = this.companiesCol.valueChanges();
    this.companies.subscribe(data => {
      console.log(data);
      if (password === data[0].code) {
        this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password'], data[0].uid);
      } else {
        console.log('false');
      }
    });
  }

  login() {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
  }

  resetPassword() {
    this.auth.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true);
  }

  // delete everything before @
  getEmailSuffix(email) {
    const splitEmail = email.split('@').pop();
    return splitEmail;
  }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    console.log(data);
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as { [key: string]: string })[key]} `;
              }
            }
          }
        }
      }
    }
  }
}

import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Errors, UserService } from "../core";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"],
})
export class AuthComponent implements OnInit {
  websiteRegex =
    "^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$";
  passwordRegex = "(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=[^0-9]*[0-9]).{8,}";
  authType: String = "";
  title: String = "";
  errors: Errors = { err: {} };
  isSubmitting = false;
  authForm: FormGroup;
  formErrors = {
    email: "",
    organisationName: "",
    phone: "",
    website: "",
    username: "",
    contactEmail: "",
    password: "",
  };
  validationMessages = {
    email: {
      required: "Email Address is required.",
      email: "Invalid email format.",
    },
    organisationName: {
      required: "Organisation Name is required.",
      minlength: "Organisation Name must be at least 3 characters long.",
    },
    firstName: {
      required: "First Name is required.",
    },
    lastName: {
      required: "Last Name is required.",
    },
    website: {
      pattern: "Invalid URL format.",
    },
    phone: {
      required: "Phone number is required.",
      pattern: "Phone number must contain only numbers.",
    },
    contactEmail: {
      required: "Email Address is required.",
      email: "Invalid email format.",
    },
    username: {
      required: "Username is required.",
      minlength: "Username must be at least 6 characters long.",
      maxlength: "Username must be at most 30 characters long.",
    },
    password: {
      required: "Please choose a password.",
      pattern:
        "Password should contain at least 8 characters with at least 1 digit, 1 lower case & 1 upper case.",
    },
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.pattern(this.passwordRegex)],
      ],
    });

    this.authForm.valueChanges.subscribe((data) => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.authForm) {
      return;
    }
    const form = this.authForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + " ";
            }
          }
        }
      }
    }
  }

  ngOnInit() {
    this.route.url.subscribe((data) => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = this.authType === "login" ? "Sign in" : "Sign up";
      // add form control and validation for register page fields
      if (this.authType === "register") {
        this.authForm.addControl(
          "username",
          new FormControl("", [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(30),
          ])
        );
        this.authForm.addControl(
          "organisationName",
          new FormControl("", [Validators.required, Validators.minLength(3)])
        );
        this.authForm.addControl(
          "firstName",
          new FormControl("", [Validators.required])
        );
        this.authForm.addControl(
          "lastName",
          new FormControl("", [Validators.required])
        );
        this.authForm.addControl(
          "registrationNumber",
          new FormControl("", [Validators.required])
        );
        this.authForm.addControl(
          "bio",
          new FormControl("", [Validators.required])
        );
        this.authForm.addControl(
          "address",
          new FormControl("", [Validators.required])
        );
        this.authForm.addControl(
          "city",
          new FormControl("", [Validators.required])
        );
        this.authForm.addControl(
          "website",
          new FormControl("", [Validators.pattern(this.websiteRegex)])
        );
        this.authForm.addControl(
          "contactEmail",
          new FormControl("", [Validators.required, Validators.email])
        );
        this.authForm.addControl(
          "phone",
          new FormControl("", [
            Validators.required,
            Validators.pattern("[0-9]*"),
          ])
        );
      }
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = { err: {} };

    const credentials = this.authForm.value;
    this.userService.attemptAuth(this.authType, credentials).subscribe(
      (data) => this.router.navigateByUrl("/"),
      (err) => {
        console.log("error happened here ", err);
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}

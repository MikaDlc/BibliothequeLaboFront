import {Component, inject, OnInit} from '@angular/core';
import {ClientDetails} from '../../Models/client-details';
import {ClientService} from '../../Services/client.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private $ClientService: ClientService = inject(ClientService);
  private $fb: FormBuilder = inject(FormBuilder);
  editAdress: boolean = false;

  user!: ClientDetails;

  fg!: FormGroup;

  ngOnInit() {
    this.$ClientService.profile().subscribe({
      next: (data: ClientDetails) => {
        this.user = data;
        this.initForm();
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  initForm() {
    this.fg = this.$fb.group({
      email: new FormControl({value: this.user.email, disabled: true}),
      name: new FormControl({value: this.user.name, disabled: true}),
      firstName: new FormControl({value: this.user.firsName, disabled: true}),
      city: new FormControl({value: this.user.city, disabled: true}, [Validators.required]),
      postalCode: new FormControl({value: this.user.postalCode, disabled: true}, [Validators.required, Validators.maxLength(4)]),
      street: new FormControl({value: this.user.street, disabled: true}, [Validators.required]),
      country: new FormControl({value: this.user.country, disabled: true}, [Validators.required]),
      numberH: new FormControl({value: this.user.numberH, disabled: true}, [Validators.required])
    });
  }

  enableAdress() {
    this.editAdress = true;
    this.fg.controls['city'].enable();
    this.fg.controls['postalCode'].enable();
    this.fg.controls['street'].enable();
    this.fg.controls['country'].enable();
    this.fg.controls['numberH'].enable();
  }

  updateAdress() {
    if (this.fg.valid) {
      this.editAdress = false;
      this.fg.controls['city'].disable();
      this.fg.controls['postalCode'].disable();
      this.fg.controls['street'].disable();
      this.fg.controls['country'].disable();
      this.fg.controls['numberH'].disable();
    }
  }

  f() {
    return this.fg.controls;
  }
}

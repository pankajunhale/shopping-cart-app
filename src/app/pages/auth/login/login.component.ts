import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { USER_ACCESS_TOKEN_KEY } from '../../../common/constants';
import { Router } from '@angular/router';
import { LocalStorageManagerService } from '../../../common/services/storage/local-storage-manager/local-storage-manager.service';
import { AuthService } from '../services/auth.service';
import { plainToInstance } from 'class-transformer';
import { SignInRequestDto, SignInResponseDto } from '../dto/sign-in';
import { isPlatformBrowser } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  isFormSubmitted = false;
  isValidUser = true;

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly storageService: LocalStorageManagerService,
    private readonly authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.init();
    }
  }

  ngOnInit(): void {
    this.constructForm();
  }

  private init() {
    this.storageService.deleteAll();
  }

  private constructForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  private handleRedirect(data: any): void {
    const response = plainToInstance(SignInResponseDto, data);
    this.storageService.set(USER_ACCESS_TOKEN_KEY, response.result?.accessToken);
    this.router.navigateByUrl("/product-list");
  }

  private handleLogin(dto: SignInRequestDto): void {
    this.authService.validateLogin({
      email: dto.email,
      password: dto.password
    }).subscribe({
      next: (res) => {
        this.isValidUser = true;
        this.handleRedirect(res)
      },
      error: (e) => {
        this.isValidUser = false;
      }
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  public onSubmit(): void {
    this.isFormSubmitted = true;
    this.isValidUser = true;
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;
    this.handleLogin({ email, password });
  }
}

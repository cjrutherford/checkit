import { CreateUserProfileDto } from '../types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfile {
  private readonly baseUrl = '/api/user';

  constructor(private readonly http: HttpClient) { }

  getUserProfile() {
    return this.http.get(`${this.baseUrl}`);
  }

  createUserProfile(profileData: CreateUserProfileDto) {
    return this.http.post(`${this.baseUrl}`, profileData);
  }

  updateUserProfile(profileData: CreateUserProfileDto) {
    return this.http.put(`${this.baseUrl}`, profileData);
  }

  deleteUserProfile() {
    return this.http.delete(`${this.baseUrl}`);
  }
}

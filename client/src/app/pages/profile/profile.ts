import { Component, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CreateUserProfileDto } from '../../types';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  constructor(private readonly users: UsersService) {
    this.loadProfile();
  }

  username = signal('johndoe');
  profilePhotoUrl = signal('https://via.placeholder.com/120');
  bio = signal('This is a short bio about John Doe.');

  isEditing = signal(false);
  editedUsername = signal(this.username());
  editedBio = signal(this.bio());
  editedProfilePhotoUrl = signal(this.profilePhotoUrl());

  loadProfile() {
    this.users.getUsers().subscribe(profile => {
      if (profile) {
        this.username.set(profile.name ?? 'johndoe');
        this.bio.set(profile.bio ?? 'This is a short bio about John Doe.');
        console.log("🚀 ~ Profile ~ loadProfile ~ profile:", profile)
        this.profilePhotoUrl.set(profile.profilePictureUrl ?? 'https://via.placeholder.com/120');
        // Keep edited fields in sync if not editing
        if (!this.isEditing()) {
          this.editedUsername.set(this.username());
          this.editedBio.set(this.bio());
          this.editedProfilePhotoUrl.set(this.profilePhotoUrl());
        }
      }
    });
  }

  onEdit() {
    this.isEditing.set(true);
    this.editedUsername.set(this.username());
    this.editedBio.set(this.bio());
    this.editedProfilePhotoUrl.set(this.profilePhotoUrl());
  }

  async onSave() {
    const createProfileDto: CreateUserProfileDto = {
      name: this.editedUsername(),
      bio: this.editedBio(),
      profilePictureUrl: this.editedProfilePhotoUrl()
    };
    // Post the profile using the users service
    await firstValueFrom(this.users.createUser(createProfileDto));
    this.username.set(this.editedUsername());
    this.bio.set(this.editedBio());
    this.profilePhotoUrl.set(this.editedProfilePhotoUrl());
    this.isEditing.set(false);
  }

  onCancel() {
    this.isEditing.set(false);
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editedProfilePhotoUrl.set(e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}

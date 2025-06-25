import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  username = 'johndoe';
  profilePhotoUrl = 'https://via.placeholder.com/120';
  bio = 'This is a short bio about John Doe.';

  isEditing = false;
  editedUsername = this.username;
  editedBio = this.bio;

  onEdit() {
    this.isEditing = true;
    this.editedUsername = this.username;
    this.editedBio = this.bio;
  }

  onSave() {
    this.username = this.editedUsername;
    this.bio = this.editedBio;
    this.isEditing = false;
  }

  onCancel() {
    this.isEditing = false;
  }

  onPhotoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profilePhotoUrl = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
}

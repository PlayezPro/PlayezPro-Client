import {  inject } from '@angular/core';
import { Router } from "@angular/router";

export const blockPage = () => {
    const router = inject(Router);

    const token = localStorage.getItem('Token');
    const userId = localStorage.getItem('users_id');

    if (token && userId) {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
}

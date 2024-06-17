import {  inject } from '@angular/core';
import { Router } from "@angular/router";

export const blockPage = () => {
    const router = inject(Router);

    const token = localStorage.getItem('Token');

    if (token) {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
}

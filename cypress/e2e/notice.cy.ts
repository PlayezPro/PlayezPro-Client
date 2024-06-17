





// import test from '@playwright/test';
// import expect from '@playwright/test';


// test.describe('Login and Wall functionalities', () => {
//   test.beforeEach(async ({ page }) => {
//     // Navega a la página de inicio
//     await page.goto('http://localhost:4200/');

//     // Ajustar la vista a tamaño móvil
//     await page.setViewportSize({ width: 375, height: 667 });
//   });

//   test('should display error messages on invalid form submission', async ({ page }) => {
//     // Llenar el formulario con credenciales inválidas
//     await page.fill('[formControlName="email"]', 'Invalid@gmail.com');
//     await page.fill('[formControlName="password"]', 'InvalidPassword');
//     await page.click('text=entrar');

//     // Verificar que se muestren los mensajes de error
//     await expect(page.locator('text=Error al iniciar sesión')).toBeVisible();

//     // Verificar que no se redirige a /home
//     await expect(page).not.toHaveURL('**/home');
//   });

//   test('should login successfully with correct credentials and test wall functionalities', async ({ page }) => {
//     // Llenar el formulario con credenciales válidas
//     await page.fill('[formControlName="email"]', 'ramon@gmail.com');
//     await page.fill('[formControlName="password"]', 'Ramon123@');
//     await page.click('text=entrar');

//     // Verificar que se muestre el mensaje de bienvenida
//     await expect(page.locator('text=¡Bienvenido!')).toBeVisible();

//     // Verificar la redirección a la página de inicio
//     await expect(page).toHaveURL('**/home');

//     // Espera a que la redirección después del login se complete y el muro cargue
//     await page.waitForTimeout(15000); // Aumenta el tiempo de espera a 15 segundos

//     // Verifica que la página de muro se haya cargado correctamente
//     await expect(page.locator('.reels_section')).toBeVisible();

//     // Like functionality
//     const likeButton = page.locator('.bi-hand-thumbs-up');
//     const likeCount = page.locator('.bi-hand-thumbs-up + span');
//     const initialLikeCount = await likeCount.textContent();

//     await likeButton.click();
//     await page.waitForTimeout(1000); // Espera un segundo para que el conteo de likes se actualice
//     const updatedLikeCount = await likeCount.textContent();
//     expect(parseInt(updatedLikeCount)).toBe(parseInt(initialLikeCount) + 1);

//     // Comment functionality
//     const commentButton = page.locator('.bi-chat');
//     await commentButton.click();
//     await page.fill('ion-input[label="Añade un comentario"]', 'Este es un comentario de prueba');
//     await page.click('ion-icon[name="arrow-up-outline"]');
//     await page.waitForTimeout(2000); // Espera dos segundos para que el comentario se añada

//     const commentList = page.locator('ion-list > ng-container');
//     const comments = await commentList.allTextContents();
//     expect(comments.some(comment => comment.includes('Este es un comentario de prueba'))).toBe(true);

//     // Share functionality
//     const shareButton = page.locator('button:has-text("Compartir")');
//     await shareButton.click();
//     const actionSheet = page.locator('ion-action-sheet');
//     await expect(actionSheet).toBeVisible();

//     // Cierra el ActionSheet
//     await page.click('ion-action-sheet button:has-text("Cerrar")');
//   });
// });

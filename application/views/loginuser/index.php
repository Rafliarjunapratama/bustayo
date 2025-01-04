<!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" type="image/x-icon" href="https://wallpapercave.com/wp/wp14473479.jpg">
      <!--=============== REMIXICONS ===============-->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/3.5.0/remixicon.css" crossorigin="">

      <!--=============== CSS ===============-->
      <link rel="stylesheet" href="<?= base_url('assets/css/styles.css')?>"> 

      <title>Login form - bustayo</title>
   </head>
   <body>
      <div class="login">
         <img src="https://asset.kompas.com/crops/zjOuiMZysYvIeUHdofSV57YhpLE=/87x62:727x489/750x500/data/photo/2022/02/24/621722fe7b3ae.jpg"  alt="image" class="login__bg">

         <form action="<?= site_url('Login/authenticate') ?>" method="post" class="login__form">
            <h1 class="login__title">Login</h1>

            <div class="login__inputs">
               
            
               <div class="login__box">
                  <input type="email" name="email" placeholder="Email ID" required class="login__input">
                  <i class="ri-mail-fill"></i>
               </div>

               <div class="login__box">
                  <input type="password" name="password" placeholder="password" required class="login__input">
                  <i class="ri-lock-2-fill"></i>
               </div>
               
            </div>

            <div class="login__check">
               <div class="login__check-box">
                  <input type="checkbox" class="login__check-input" id="user-check">
                  <label for="user-check" class="login__check-label">Remember me</label>
               </div>

               <a href="#" class="login__forgot"></a>
            </div>

            <button type="submit" class="login__button">Login</button>

            <div class="login__register">
               Don't have an account? <a href="<?= base_url('login/register')?>">Register</a>
            </div>
         </form>
      </div>
   </body>
</html>
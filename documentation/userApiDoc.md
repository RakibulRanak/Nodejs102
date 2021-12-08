## User Api Docs

### 
- Without any authorization ( must be logged out )

    * Sign Up  : `POST /api/v1/users`
        ```json
        Request Body
        {
            "username" : "aquaman",
            "name" : "Md. Tarek",
            "email" : "acquatarek@gmail.com",
            "password":"1234678",
            "confirmPassword":"12345678"
        }
        ```
   * Login User : `POST /api/v1/users/login`
        ```json
        Request Body
        {
            "email":"acquatarek@gmail.com",
            "password":"12345678"
        }
        ```


### 
- Authorized And Performed By User Himself

   * Log Out User : `GET /api/v1/users/logout`

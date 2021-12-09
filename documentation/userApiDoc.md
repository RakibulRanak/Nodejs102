## User Api Docs

### 
- **Without any authorization** ( must be logged out )

    * Sign Up  : `POST /api/v1/users`
        -  Request Body
            ```json
                {
                    "username" : "aquaman",
                    "name" : "Md. Tarek",
                    "email" : "acquatarek@gmail.com",
                    "password":"1234678",
                    "confirmPassword":"12345678"
                }
            ```
        - Valid Request Field Requirements:
            - username can't be null
            - name can't be null
            - email can't be null
            - password must be between 8 to 15 chars
            - confirmPassword must match password
        &nbsp;
        &nbsp;

        - Valid Response
            
            Status: 201 Created  
            
            ```json
                {
                    "status": "success",
                    "message": "User Created Successfully",
                    "data": {
                        "email": "acquatarek@gmail.com",
                        "name": "Md. Tarek",
                        "username": "aquaman"
                    }
                }       
            ```
            
        
   * Login User : `POST /api/v1/users/login`
        -  Request Body
            ```json
            {
                "email":"acquatarek@gmail.com",
                "password":"12345678"
            }
            ```
        - Valid Request Field Requirements:
            - username can't be null
            - password must be between 8 to 15 chars        
        &nbsp;
        - Valid Response ( returns with a jwt cookie )
        
            Status: 200 OK  
            
            ```json
                {
                    "status": "success",
                    "message": "User looged In successfully",
                    "data": {
                        "email": "acquatarek@gmail.com",
                        "name": "Md. Tarek",
                        "username": "aquaman"
                    }
                }       
            ```


### 
- **Authorized And Performed By User Himself**

   * Log Out User : `GET /api/v1/users/logout`

     - Valid Response
        
        Status: 200 OK  
        
        ```json
            {
                "status": "success",
                "message": "User looged Out successfully",
                "data": null
            }
        ```

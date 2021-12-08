## Story Api Docs

### 
- Without any authorization

    * Get All Stories  : `GET /api/v1/stories`
       
    * Get A Single Story : `GET /api/v1/stories/:storyId`


### 
- Authorized And Performed By User Himself

   * Post A Story : `POST /api/v1/stories`

        ```json
        Request Body
        {
           "title" : "Brave Lion",
           "story" : "Once upon a time a lion lived in a jungle. ....."
        }
        ```
    * Update A Story : `PUT /api/v1/stories/:storyId`

        ```json
        Request Body
        {
           "title" : "Brave Cow",
           "story" : "Once upon a time a lion lived in a jungle. ....."
        }
        ```
    * Delete  A Story : `DELETE /api/v1/stories/:storyId`

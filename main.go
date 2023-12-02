package main

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default() //이건 뭐야?
  r.Static("/assets", "./assets")  //여기 main에 있는 코드들 그냥 복붙하면 되는거? 아님 외워야하는거? 코드를?
	r.LoadHTMLGlob("templates/*")


  r.GET("/list", func(c *gin.Context) {
    c.HTML(http.StatusOK,"contact-list.html", gin.H{})
  })

  r.GET("/add", func(c *gin.Context) {
    c.HTML(http.StatusOK,"add-contact.html", gin.H{})
  })

  r.GET("/edit", func(c *gin.Context) {
    c.HTML(http.StatusOK,"edit-contact.html", gin.H{})
  })

  r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
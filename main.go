package main

import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)



func main() {
  r := gin.Default() //이건 뭐야?
  r.Static("/assets", "./assets")  //여기 main에 있는 코드들 그냥 복붙하면 되는거? 아님 외워야하는거? 코드를?
	r.LoadHTMLGlob("templates/*")

  //이거 대문자 써야 먹히는 이유 
  type user struct{
    Name string
    Number int
  }
  
  //010붙이니까 안돼. 무슨 진수 뭐시기 하는데 뭔말
  users := []user{
    {"박유진",93927723},
    {"박수현",85566254},
  }


  r.GET("/list", func(c *gin.Context) {
    c.HTML(http.StatusOK,"contact-list.html", gin.H{})
  })

  r.GET("/add", func(c *gin.Context) {
    c.HTML(http.StatusOK,"add-contact.html", gin.H{})
  })

  r.GET("/edit", func(c *gin.Context) {
    c.HTML(http.StatusOK,"edit-contact.html", gin.H{})
  })

  r.GET("/getUsers", func(c *gin.Context) {
    fmt.Println(users)
    c.JSON(200,users)
  })



// fmt.Println(users)





  r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
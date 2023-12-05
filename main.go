package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)



func main() {
  r := gin.Default() 
  r.Static("/assets", "./assets") 
	r.LoadHTMLGlob("templates/*")

  type user struct{
    Name string  `form:"name"`
    Number string `form:"number"`
  }
  
  users := []user{
    {"박유진","010-9392-7723"},
    {"박수현","010-8556-6254"},
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
  r.GET("/success", func(c *gin.Context) {
    c.HTML(http.StatusOK,"success.html", gin.H{})
  })
  r.GET("/getUsers", func(c *gin.Context) {
    fmt.Println(users)
    c.JSON(200,users)
  })
  
  r.DELETE("/delete/:id", func(c *gin.Context) {
    id,err:= strconv.Atoi (c.Param("id"))  
    if err != nil {
			fmt.Println("경고")
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "올바르지 않은 ID입니다."})
			return
		}
    for i:=0; i<len(users); i++ {
      if i==id{ 
        c.IndentedJSON(http.StatusNotFound, gin.H{"deleteUser":users[i]})
        users = append(users[:id], users[id+1:]... )
        fmt.Println(users)      
        return 
      }
    }
    c.IndentedJSON(http.StatusNotFound, gin.H{"message": "올바르지 않은 ID입니다."})
  })

  r.POST("/add", func(c *gin.Context) {
		var newUser user
		if err := c.Bind(&newUser); err != nil {
			return 
		}
    fmt.Println(newUser)
		users = append(users,newUser)
		fmt.Println(users)
    c.HTML(http.StatusOK, "success.html",gin.H{
		})
	})

  r.GET("/getId", func(c *gin.Context) { 
		c.Query("id") 
		id,_:= strconv.Atoi (c.Query("id"))  
		fmt.Println(users[id])
		c.JSON(200, users[id])
	})

  r.PUT("/edit/:id", func(c *gin.Context) {
		var editUser user
		if err := c.Bind(&editUser); err != nil {
			return 
		}

		id,err:= strconv.Atoi (c.Param("id"))  
		fmt.Println(id)
		if err != nil {
			fmt.Println("경고")
			c.IndentedJSON(http.StatusNotFound, gin.H{"message": "올바르지 않은 ID입니다."})
			return
		}

		users[id]=editUser
		c.JSON(http.StatusOK, gin.H{
			"user" : users[id], 
		})
	})

  r.Run()
}
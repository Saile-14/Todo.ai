package main

import (
	// "database/sql"
	"fmt"
	// "log"

	"net/http"

	"github.com/gorilla/mux"

	"server/cmd/handlers/tasks"

	"server/cmd/db/task"
	"server/cmd/db/user"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {	
	router := mux.NewRouter()
	
	router.HandleFunc("/", landingSite).Methods("GET")
	router.HandleFunc("/tasks", tasksRoutes.GetTasks).Methods("GET")
	router.HandleFunc("/tasks/{id}", tasksRoutes.GetTask).Methods("GET")
	router.HandleFunc("/tasks", tasksRoutes.CreateTask).Methods("POST")
	router.HandleFunc("/tasks", tasksRoutes.CreateTask).Methods("DELETE")
	router.HandleFunc("/tasks", tasksRoutes.CreateTask).Methods("POST")
	
	// log.Fatal(http.ListenAndServe("0.0.0.0:443", router))

	// Password Hashing and salting with bcrypt
	// hashedPassword := "$2122"

	// inputpsk := "passkeymon"
	// if checkPassword(inputpsk, hashedPassword) {
	// 	print("Valid")
	// }

	
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}


	// USER BELOW

	// Migrate the schema
	// db.AutoMigrate(&userDB.User{})

	// Create
	username := "eber"
	password := "psk123"
	newUser := userDB.User{Username: username, Password: password}
	userDB.CreateUser(db, newUser)

	// Read
	// var user userDB.User
	// found := userDB.ReadUser(db, 3, &user)
	// if found {
	// 	fmt.Println(user.Username)
	// 	fmt.Println(user.Password)
	// } else {
	// 	fmt.Printf("User Not found")
	// }

	// Update
	// userDB.UpdateUser(db, 2, "dennisDoge")
	// fmt.Printf("ALIVE")

	// Delete
	// var id uint64 = 2
	// found := userDB.DeleteUser(db, id)
	// if found {
	// 	fmt.Println(id)
	// 	fmt.Println("deleted")
	// } else {
	// 	fmt.Println("not found")
	// }
	

	


	// TASKS BELOW

	// Migrate the schema
	// db.AutoMigrate(&taskDB.Task{})

	// Create
	title := "eper time"
	desc := "Walk"
	query := "Drive"
	isdone := false
	var userID uint64 = 2
	newTask := taskDB.Task{Title: title, Desc: desc, Query: query, Isdone: isdone, Userid: userID}
	taskDB.CreateTask(db, newTask)

	// Read
	// var task Task
	// db.First(&task, 1) // find product with integer primary key
	// db.First(&task, "isdone = ?", false) // find product with code D42
	// fmt.Printf(task.Title)

	// Update - update product's price to 200
	// title := "Go to Home"
	// desc := "Fart"
	// query := "Sleep"
	// isdone := true
	// var userID uint64 = 2
	// newTask := taskDB.Task{Title: title, Desc: desc, Query: query, Isdone: isdone, Userid: userID}
	// taskDB.UpdateTask(db, 2, newTask)

	// Delete - delete product
	// db.Delete(&task, 1) // ID
	// dbCreateTables()

}

// ./ GET
func landingSite(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Home")
}

package main

import (
	// "database/sql"
	"errors"
	"fmt"
	"log"

	// "log"
	"net/http"

	"server/cmd/handlers"

	"github.com/gorilla/mux"

	// "github.com/Saile-14/Todo.ai/cmd/db"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	Title			string
	Desc			string
	Query 			string 
	Isdone			bool
	Userid			uint64
}

type User struct {
	gorm.Model
	Username string
	Password string
}

func hashPasword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        return "", err
    }
    return string(hashedPassword), nil
}

func checkPassword(inputPassword string, hashedPassword string) (bool) {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(inputPassword))
	pskCorrect := false

	if err == nil {
		pskCorrect = true
	}

	return pskCorrect
}

func createUser(db *gorm.DB, username string, password string) (bool) {
	hashedPassword, err := hashPasword(password)
	
	if err != nil {
		log.Fatal(err)
		return false
	}
	fmt.Println(hashedPassword)

	result := db.Create(&User{Username: username, Password: hashedPassword})
	return result.Error == nil
}

func doesUserExist(db *gorm.DB, id uint64, user User) (bool) {
	err := db.First(&user, id).Error
	return errors.Is(err, gorm.ErrRecordNotFound)
}

func readUser(db *gorm.DB, id uint64, user *User) (bool) {
	if doesUserExist(db, id, *user) {
		return false
	}
	db.First(&user, id) 
	return true
}

// As username is unique for logins, there should be a doesUsernameExist to keep uniqueness.
func updateUser(db *gorm.DB, id uint64, newUsername string) (bool) {
	var user User
	if doesUserExist(db, id, user) {
		return false
	}
	
	db.Model(&user).Where("id", id).Update("username", newUsername)
	return true
}

func deleteUser(db *gorm.DB, id uint64) (bool) {
	var user User
	if doesUserExist(db, id, user) {
		return false
	}
	
	db.Delete(&user, id) // ID
	return true
}

func main() {	
	router := mux.NewRouter()
	
	router.HandleFunc("/", landingSite).Methods("GET")
	router.HandleFunc("/tasks", handlers.GetTasks).Methods("GET")
	router.HandleFunc("/tasks/{id}", handlers.GetTask).Methods("GET")
	router.HandleFunc("/tasks", handlers.CreateTask).Methods("POST")
	router.HandleFunc("/tasks", handlers.CreateTask).Methods("DELETE")
	router.HandleFunc("/tasks", handlers.CreateTask).Methods("POST")
	
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
	db.AutoMigrate(&User{})

	// Create
	// username := "Dylan8404"
	// password := "psk123"
	// createUser(db, username, password)

	// Read
	var user User
	found := readUser(db, 1, &user)
	if found {
		fmt.Println(user.Username)
		fmt.Println(user.Password)
	} else {
		fmt.Printf("User Not found")
	}

	// Update
	// updateUser(db, 2, "dylan8404")
	// fmt.Printf("ALIVE")

	// Delete
	id := 2
	found = deleteUser(db, id)
	if found {
		fmt.Println(id)
		fmt.Println("deleted")
	} else {
		fmt.Println("not found")
	}
	

	


	// TASKS BELOW

	// Migrate the schema
	// db.AutoMigrate(&Task{})

	// Create
	// db.Create(&Task{Title: "Go to Store", Desc: "Walk", Query: "Drive", Isdone: false, Userid: 1})

	// Read
	// var task Task
	// db.First(&task, 1) // find product with integer primary key
	// db.First(&task, "isdone = ?", false) // find product with code D42
	// fmt.Printf(task.Title)

	// Update - update product's price to 200
	// db.Model(&task).Update("isdone", true)
	// Update - update multiple fields
	// db.Model(&task).Updates(Task{: 200, Code: "F42"}) // non-zero fields
	// db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})

	// Delete - delete product
	// db.Delete(&task, 1) // ID
	// dbCreateTables()

}

// func dbCreateTables() {
// 	// Open a database connection (creates a new file if it doesn't exist)
// 	db, err := sql.Open("sqlite3", "./test.db")
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// 	defer db.Close()

	

// 	// dbExecuteCommand(createUserTableSQL, db)
// 	_sql, err = db.Exec(createUserTableSQL)
// 	if err != nil {
// 		log.Fatal(err)
// 	}
// }

// func createTable(db *sql.DB) {
// 	// Create new USERS table
// 	createUserTableSQL := `CREATE TABLE IF NOT EXISTS users (
// 		id NOT NULL INTEGER PRIMARY KEY AUTOINCREMENT,
// 		username TEXT,
// 		passkey TEXT
// 	);`


// }

// ./ GET
func landingSite(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Home")
}

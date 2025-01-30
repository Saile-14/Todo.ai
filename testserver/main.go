package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type Task struct {
	gorm.Model
	Title   string `json:"title"`
	Content string `json:"content"`
}

var db *gorm.DB

func init() {
	var err error
	db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	if err := db.AutoMigrate(&Task{}); err != nil {
		log.Fatal("failed to migrate database:", err)
	}
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/tasks", getTasksHandler).Methods("GET")
	r.HandleFunc("/tasks", createTaskHandler).Methods("POST")

	test := "Server running on :5000"
	var t *string
	t = &test
	fmt.Println(*t)

	corsOptions := handlers.AllowedOrigins([]string{"http://localhost:5173"})
	corsMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})
	corsHeaders := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})

	handler := handlers.CORS(corsOptions, corsMethods, corsHeaders)(r)

	http.ListenAndServe(":5000", handler)

}

func getTasksHandler(w http.ResponseWriter, r *http.Request) {
	var tasks []Task
	result := db.Find(&tasks)

	if result.Error != nil {
		http.Error(w, "Failed to retrieve tasks", http.StatusInternalServerError)
		log.Println("Error fetching tasks:", result.Error)
		return
	}
	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(tasks); err != nil {
		http.Error(w, "Error encoding tasks", http.StatusInternalServerError)
		log.Println("Error encoding tasks to JSON:", err)
		return
	}
}

func createTaskHandler(w http.ResponseWriter, r *http.Request) {
	var newTask Task

	err := json.NewDecoder(r.Body).Decode(&newTask)
	if err != nil {
		http.Error(w, "invalid request payload", 400)
		return
	}

	if err := db.Create(&newTask).Error; err != nil {
		http.Error(w, "Couldnt create task", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newTask)
}

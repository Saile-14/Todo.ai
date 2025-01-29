package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

type Task struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

var tasks = []Task{
	{ID: 1, Title: "Walk the dog", Content: "you have to take the bags"},
	{ID: 2, Title: "Wash the dishes", Content: "try not to end it all"},
	{ID: 3, Title: "Maybe do some situps", Content: "ichi ni san shi"},
}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/tasks", getTasksHandler).Methods("GET")
	r.HandleFunc("/tasks", createTaskHandler).Methods("POST")

	http.ListenAndServe(":5000", handlers.CORS()(r))

}

func getTasksHandler(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(tasks)
}

func createTaskHandler(w http.ResponseWriter, r *http.Request) {
	var newTask Task
	err := json.NewDecoder(r.Body).Decode(&newTask)
	if err != nil {
		log.Fatal(err)
	} else {
		tasks = append(tasks, newTask)
		json.NewEncoder(w).Encode(newTask)
	}

}

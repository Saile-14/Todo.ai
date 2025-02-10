package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"server/cmd/models" // Import the models package

	"github.com/gorilla/mux"
)

var tasks []models.Task

// ./tasks GET
func GetTasks(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(tasks)
}

// ./tasks/{id} GET
func GetTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	id_index, err := strconv.Atoi(id)

	if err != nil {
		fmt.Println("Error:", err)
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	// If index is outside tasks length
	if id_index >= len(tasks) {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}

	// Return the task by index
	json.NewEncoder(w).Encode(tasks[id_index])
}

// ./tasks POST
func CreateTask(w http.ResponseWriter, r *http.Request) {
	var newTask models.Task
	_ = json.NewDecoder(r.Body).Decode(&newTask)
	tasks = append(tasks, newTask)
	json.NewEncoder(w).Encode(newTask)
}

// ./tasks DELETE
func DeleteTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	id_index, err := strconv.Atoi(id)

	if err != nil {
		http.Error(w, "Invalid task ID", http.StatusBadRequest)
		return
	}

	// If index is outside tasks length
	if id_index >= len(tasks) {
		http.Error(w, "Task not found", http.StatusNotFound)
		return
	}

	// Remove the task
	tasks = append(tasks[:id_index], tasks[id_index+1:]...)
	w.WriteHeader(http.StatusNoContent)
}

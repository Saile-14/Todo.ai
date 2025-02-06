package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"testserver/ent"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

var db *sql.DB

type Task struct {
	Title   string
	Content string
}

type TaskDB struct {
	ID int
	Task
}

func main() {

	client, err := ent.Open("sqlite3", "file:test.db")
	if err != nil {
		log.Fatalf("failed opening connections to sqlite: %v", err)
	}

	defer client.Close()

	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	test := "Server running on :5000"
	var t *string
	t = &test
	fmt.Println(*t)

	handler := setupCORS(setupRouters(client * ent.Client))

	http.ListenAndServe(":5000", handler)

}

func setupRouters(client *ent.Client) *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/tasks", getTaskHandler).Methods("GET")
	r.HandleFunc("/tasks", createTaskHandler(client)).Methods("POST")
	return r
}

func setupCORS(r *mux.Router) http.Handler {
	corsOptions := handlers.AllowedOrigins([]string{"http://localhost:5173"})
	corsMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	corsHeaders := handlers.AllowedHeaders([]string{"Content-Type"})
	return handlers.CORS(corsOptions, corsMethods, corsHeaders)(r)
}

func createTaskHandler(client *ent.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		task, err := CreateTask(r.Context(), client)

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(task)
	}

}

func CreateTask(ctx context.Context, client *ent.Client) (*ent.Task, error) {
	t, err := client.Task.
		Create().
		SetTitle("First task !").
		SetContent("sike this probably like the seventh one").
		Save(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed creating task: %w", err)
	}

	log.Println("task was created: ", t)
	return t, nil
}

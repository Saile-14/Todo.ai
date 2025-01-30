package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	_ "modernc.org/sqlite"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func init() {
	db, err := sql.Open("sqlite", "file:test.db")
	if err != nil {
		log.Fatal(err)
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

func setupRouters() *mux.Router {
	r := mux.NewRouter()
	r.HandleFunc("/tasks", getTasksHandler).Methods("GET")
	r.HandleFunc("/tasks", createTaskHandler).Methods("POST")
	return r
}

func setupCORS(r *mux.Router) http.Handler {
	corsOptions := handlers.AllowedOrigins([]string{"http://localhost:5173"})
	corsMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	corsHeaders := handlers.AllowedHeaders([]string{"Content-Type"})
	return handlers.CORS(corsOptions, corsMethods, corsHeaders)(r)
}

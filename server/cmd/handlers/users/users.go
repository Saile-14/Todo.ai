package usersRoutes

import (
	"fmt"
	"net/http"

	"server/cmd/db/sessions"
	"server/cmd/db/user"
	"server/cmd/handlers/sessions"

	// "github.com/gorilla/mux"
	"gorm.io/gorm"
)

func Login(w http.ResponseWriter, r *http.Request) {
	// Extract DB connection from the request context
	db, ok := r.Context().Value("db").(*gorm.DB)
	if !ok {
		http.Error(w, "Database connection not found", http.StatusInternalServerError)
		return
	}

	username := r.FormValue("username")
	password := r.FormValue("password") // Password should also be hashed before sent through the HTTP body.

	var user = userDB.User{}
	// Does username exist?
	if !userDB.FindUserIDFromUsername(db, username, &user) {
		http.Error(w, "Invalid Credentials", http.StatusUnauthorized)
		return
	}

	var userID uint = user.ID
	// // Password check
	if !userDB.CheckPassword(password, user.Password) {
		http.Error(w, "Invalid Credentials", http.StatusUnauthorized)
		fmt.Println("Password Missmatch")
		return
	}

	// Create a session
	sessionID, err := sessionsDB.CreateSession(db, userID)
	if !err {
		http.Error(w, "Failed to create session", http.StatusInternalServerError)
		return
	}

	// Set the session cookie
	sessionsRoutes.SetSessionCookie(w, sessionID)

	// Respond with success
	w.Write([]byte("Login successful"))
}

func Logout(w http.ResponseWriter, r *http.Request, db *gorm.DB) {

}
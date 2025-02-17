package sessionsRoutes

import (
	"net/http"
)


func SetSessionCookie(w http.ResponseWriter, sessionID string) {
	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    sessionID,
		HttpOnly: true,
		Secure:   true, // over HTTPS
		Path:     "/",
		MaxAge:   3600, // 1 hour
	})
}

func ClearSessionCookie(w http.ResponseWriter) {
	http.SetCookie(w, &http.Cookie{
		Name:     "session_id",
		Value:    "",
		HttpOnly: true,
		Secure:   true, // Set to true if using HTTPS
		Path:     "/",
		MaxAge:   -1, // Expire the cookie immediately
	})
}
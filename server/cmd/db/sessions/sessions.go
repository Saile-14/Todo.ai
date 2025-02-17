package sessionsDB

import (
	// "fmt"
	"log"
	"time"
	// "log"
	"errors"

	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"

	"gorm.io/gorm"
)

type Session struct {
	gorm.Model
	SessionID 		string
	UserID 			uint
	LastActivity	time.Time
	ExpiresAt		time.Time
}

// var sessionInterface Session

func GenerateSessionID() (string, error) {
	// 64-byte random session ID
	bytes := make([]byte, 64)
	_, err := rand.Read(bytes)
	
	if err != nil {
		return "", err
	}

	// Hash the session ID (for storage in DB)
	hash := sha256.Sum256(bytes)
	return hex.EncodeToString(hash[:]), nil
}

func CreateSession(db *gorm.DB, userID uint) (string, bool) {
	sessionID, err := GenerateSessionID()
	
	if err != nil {
		return "", false
	}

	result := db.Create(&Session{SessionID: sessionID,
							UserID: userID,
							LastActivity: time.Now(),
							ExpiresAt: time.Now().Add(1*time.Hour)})

	return sessionID, result.Error == nil
}

func DoesSessionNotExist(db *gorm.DB, sessionID string, session *Session) (bool) {
	err := db.Where("session_id = ?", sessionID).First(session).Error
	return errors.Is(err, gorm.ErrRecordNotFound)
}

func CheckIfSessionIsValid(db *gorm.DB, sessionID string) (bool) {
	// Exists? (Better with select user id then find session id?)
	var session Session
	if DoesSessionNotExist(db, sessionID, &session) {
		return false
	}

	// Expired?
	if session.ExpiresAt.Before(time.Now()) {
		log.Println("Session Expired")
		return false
	}

	session.LastActivity = time.Now()
	err := db.Save(&session).Error
	if err != nil {
		log.Println("Error updating session last activity", err)
	}

	return true
}

func DeleteSession(db *gorm.DB, sessionID string) (bool) {
	var session Session
	if DoesSessionNotExist(db, sessionID, &session) {
		return false
	}
	
	db.Delete(&session)
	return true
}
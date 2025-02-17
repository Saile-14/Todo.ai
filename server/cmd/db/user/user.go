package userDB

import (
	"fmt"
	// "log"
	
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"errors"
)

type User struct {
	gorm.Model
	Username string
	Password string
}

func HashPasword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        return "", err
    }
    return string(hashedPassword), nil
}

func CheckPassword(inputPassword string, hashedPassword string) (bool) {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(inputPassword))
	pskCorrect := false

	if err == nil {
		pskCorrect = true
	}

	return pskCorrect
}

func CreateUser(db *gorm.DB, newUser User) (bool) {
	hashedPassword, err := HashPasword(newUser.Password)
	
	if err != nil {
		// log.Fatal(err)
		fmt.Printf("Could not create user")
		return false
	}
	fmt.Println(hashedPassword)

	result := db.Create(&User{Username: newUser.Username, Password: hashedPassword})
	return result.Error == nil
}

func DoesUserNotExist(db *gorm.DB, id uint64, user User) (bool) {
	err := db.First(&user, id).Error
	return errors.Is(err, gorm.ErrRecordNotFound)
}

func ReadUserFromID(db *gorm.DB, id uint64, user *User) (bool) {
	if DoesUserNotExist(db, id, *user) {
		return false
	}
	db.First(&user, id) 
	return true
}

func FindUserIDFromUsername(db *gorm.DB, username string, user *User) (bool) {
	err := db.First(&user, "username = ?", username).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		// log.Fatal(err)
		fmt.Printf("User not found")
		return false
	}
	return true
}

// As username is unique for logins, there should be a doesUsernameExist to keep uniqueness.
func UpdateUser(db *gorm.DB, id uint64, newUsername string) (bool) {
	var user User
	if DoesUserNotExist(db, id, user) {
		return false
	}
	
	db.Model(&user).Where("id", id).Update("username", newUsername)
	return true
}

func DeleteUser(db *gorm.DB, id uint64) (bool) {
	var user User
	if DoesUserNotExist(db, id, user) {
		return false
	}
	
	db.Delete(&user, id) // ID
	return true
}


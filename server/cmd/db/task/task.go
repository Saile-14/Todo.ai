package taskDB

import (
	"fmt"
	// "log"
	"errors"
	
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
var taskInterface Task

// TODO: Add Error handling

func CreateTask(db *gorm.DB, newTask Task) {
	// fmt.Printf(newTask.Title)
	db.Create(&Task{Title: newTask.Title,
					Desc: newTask.Desc,
					Query: newTask.Query,
					Isdone: newTask.Isdone,
					Userid: newTask.Userid})
	fmt.Printf("Created new task")
}

func DoesTaskExist(db *gorm.DB, id uint64, task Task) (bool) {
	err := db.First(&task, id).Error
	return errors.Is(err, gorm.ErrRecordNotFound)
}

func ReadTask(db *gorm.DB, id uint64, task *Task) (bool) {
	if DoesTaskExist(db, id, *task) {
		return false
	}
	db.First(&task, id)
	return true
}

func UpdateTask(db *gorm.DB, id uint64, updatedTask Task) (bool) {
	if DoesTaskExist(db, id, taskInterface) {
		return false
	}

	db.Model(taskInterface).Where("id", id).Updates(&Task{Title: updatedTask.Title,
											Desc: updatedTask.Desc,
											Query: updatedTask.Query,
											Isdone: updatedTask.Isdone,
											Userid: updatedTask.Userid})
	return true
}

func DeleteTask(db *gorm.DB, id uint64) (bool) {
	if DoesTaskExist(db, id, taskInterface) {
		return false
	}

	db.Delete(&taskInterface, id) // ID
	return true
}
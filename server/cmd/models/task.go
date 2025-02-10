package models

// Task Json Object
type Task struct {
	Original_Query string `json:"query"`
	Title          string `json:"title"`
	Description    string `json:"desc"`
	Finished       bool   `json:"finished"`
}

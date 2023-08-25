package main

import (
	"database/sql"
	"fmt"

	"github.com/Ashpara10/server/types"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Storage struct {
	db *gorm.DB
}

func NewMySqlStorage() (*Storage, error) {
	store, err := gorm.Open(postgres.Open("postgres://default:dUB3LGpXWj2I@ep-autumn-moon-546240.us-east-1.postgres.vercel-storage.com:5432/verceldb"), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return &Storage{
		db: store,
	}, nil
}

func (s *Storage) CreateTables() error {
	return s.db.AutoMigrate(&types.User{}, &types.Note{})
}

func (s *Storage) Init() error {
	return s.CreateTables()
}

// func (s *Storage) FetchAllNotes(id int) error {
// 	s.db.Model(&types.Note{}).Where("userid = ?", id)
// }

func (s *Storage) CreateUser(u *types.User) (*types.User, error) {
	user := types.User{
		Username: u.Username,
		Email:    u.Email,
		Password: u.Password,
	}
	result := s.db.Select("username", "email", "password").Create(&user)
	if result.Error != nil {
		return nil, result.Error
	}
	// var createdUser types.User
	// err := s.db.Model(&types.User{}).Where("email = ?", u.Email).Find(&createdUser)
	// if err.Error != nil {
	// 	return nil, result.Error
	// }
	// fmt.Println(createdUser)
	return &user, nil

}
func (s *Storage) DeleteUser(userId string) error {
	result := s.db.Model(&types.User{}).Delete(userId)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
func (s *Storage) GetUserById(userId string) (*types.User, error) {

	u := new(types.User)

	rows, err := s.db.Model(&types.User{}).Where("id = ?", userId).Select("id", "username", "email").Rows()
	if err != nil {
		return nil, err
	}
	for rows.Next() {

		return scanIntoAccount(rows)
	}
	defer rows.Close()

	return u, fmt.Errorf("User with id %s not found", userId)
}
func (s *Storage) GetUserByEmail(email string) (*types.User, error) {

	u := new(types.User)

	rows, err := s.db.Model(&types.User{}).Where("email = ?", email).Select("id", "email", "password").Rows()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		err := rows.Scan(&u.ID, &u.Email, &u.Password)
		if err != nil {
			return nil, err
		}
		return u, nil
	}
	defer rows.Close()

	return u, fmt.Errorf("User with id %s not found", email)
}

func scanIntoAccount(rows *sql.Rows) (*types.User, error) {
	u := new(types.User)
	err := rows.Scan(
		&u.ID,
		&u.Username,
		&u.Email)

	return u, err
}

func (s *Storage) FetchAllNotes(userid string) (interface{}, error) {
	var notes []types.Note
	err := s.db.Model(&types.Note{}).Where("user_id = ?", userid).Find(&notes)
	if err.Error != nil {
		return nil, err.Error
	}
	fmt.Println("NOTES :", notes)
	return notes, nil
}
func (s *Storage) CreateNote(note *types.Note) (interface{}, error) {

	err := s.db.Model(&types.Note{}).Create(&note)
	if err.Error != nil {
		return nil, err.Error
	}
	return note, nil
}
func (s *Storage) UpdateNote(noteId string, payload *types.Note) (interface{}, error) {

	var note *types.Note
	result := s.db.First(&note, "ID = ?", noteId)
	if err := result.Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, fmt.Errorf("No Note with Id %s Does not exists ", noteId)
		}
		return nil, err
	}
	updates := make(map[string]interface{})
	if payload.Title != "" {
		updates["Title"] = payload.Title
	}
	if payload.Content != "" {
		updates["Content"] = payload.Content
	}
	if payload.Tags != "" {
		updates["Tags"] = payload.Tags
	}

	err := s.db.Model(&types.Note{}).Where(" ID = ? ", noteId).Updates(&updates)
	if err.Error != nil {
		return nil, err.Error
	}
	return updates, nil
}
func (s *Storage) DeleteNote(noteId string) error {
	err := s.db.Where("ID = ?", noteId).Delete(&types.Note{})
	if err != nil {
		return err.Error
	}
	return nil
}
func (s *Storage) GetNoteByID(id string) (*types.Note, error) {
	note := new(types.Note)

	rows, err := s.db.Model(&types.Note{}).Where("ID = ?", id).Omit("UserId", "DeletedAt").Rows()
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		err := rows.Scan(&note.ID, &note.CreatedAt, &note.UpdatedAt, &note.Title, &note.Content, &note.Tags)
		if err != nil {
			return nil, err
		}
		return note, nil

	}
	defer rows.Close()

	return note, fmt.Errorf("Note with id %s not found", id)
}
